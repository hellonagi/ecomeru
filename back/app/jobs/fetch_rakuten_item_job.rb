require 'net/http'
require 'json'

class FetchRakutenItemJob
  include Sidekiq::Job
  include Sidekiq::Throttled::Job

  # 1秒に1つのリクエストのみ許可
  sidekiq_throttle(concurrency: { limit: 1 }, threshold: { limit: 1, period: 1.second })
  sidekiq_options unique: :until_executed

  def perform(itemid, review_slug, slug)
    application_id = ENV['RAKUTEN_ID']
    affiliate_id = ENV['RAKUTEN_AFFILIATE']

    # application_idが設定されているか確認
    unless application_id
      puts '環境変数 RAKUTEN_ID が設定されていません'
      return
    end

    item_uri = URI("https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?format=json&itemCode=#{itemid}&applicationId=#{application_id}&affiliateId=#{affiliate_id}")

    begin
      # GETリクエストを送信
      response = Net::HTTP.get(item_uri)
      data = JSON.parse(response)

      if data['Items'].empty?
        puts 'itemCodeが機能していません'
        return
      end

      # 必要に応じてデータを保存
      item_data = data['Items'][0]['Item']

      item_code = item_data['itemCode']

      # 商品が既に存在するか確認
      existing_product = Product.find_by(code: item_code)

      if existing_product
        puts 'この商品はすでに存在します。'
      else
        ActiveRecord::Base.transaction do
          # 商品が存在しない場合、新しいレコードを作成
          product = Product.new(
            name: item_data['itemName'],
            slug: slug,
            code: item_data['itemCode'],
            catchcopy: item_data['catchcopy'],
            price: item_data['itemPrice'],
            image: item_data['mediumImageUrls'][0]['imageUrl'], # 複数の画像がある場合は1つ目を選択
            review_average: item_data['reviewAverage'],
            review_count: item_data['reviewCount'],
            item_url: item_data['itemUrl'],
            review_slug: review_slug
          )

          raise ActiveRecord::Rollback, "商品保存に失敗しました: #{product.errors.full_messages.join(', ')}" unless product.save

          puts '商品が正常に追加されました。'

          # ショップを探すか新規作成
          shop = Shop.find_or_initialize_by(code: item_data['shopCode']) do |s|
            s.name = item_data['shopName']
            s.url = item_data['shopUrl']
          end

          raise ActiveRecord::Rollback, "ショップ保存に失敗しました: #{shop.errors.full_messages.join(', ')}" unless shop.save

          # 中間テーブルへのリレーションを作成
          product.shops << shop unless product.shops.include?(shop)

          puts 'ショップが正常に追加または更新されました。'
          puts 'products_shopsにデータが追加されました。'

          # ジャンルの保存

          raise ActiveRecord::Rollback, 'ジャンルIDが存在しません' unless item_data['genreId']

          genre_id = item_data['genreId']
          genre_uri = URI("https://app.rakuten.co.jp/services/api/IchibaGenre/Search/20140222?format=json&genreId=#{genre_id}&genrePath=0&formatVersion=2&applicationId=#{application_id}")

          genre_response = Net::HTTP.get(genre_uri)
          genre_data = JSON.parse(genre_response)

          raise ActiveRecord::Rollback, 'ジャンルデータが見つかりませんでした。' unless genre_data['current'] && genre_data['parents']

          genres_info = [genre_data['current']] + genre_data['parents']
          genres_info.each do |genre_info|
            genre = Genre.find_or_initialize_by(code: genre_info['genreId']) do |g|
              g.name = genre_info['genreName']
              g.code = genre_info['genreId']
            end

            raise ActiveRecord::Rollback, "ジャンルの保存に失敗しました: #{genre.errors.full_messages.join(', ')}" unless genre.save

            # 中間テーブル (product_genres) にデータを保存
            ProductGenre.find_or_create_by(product: product, genre: genre) do |pg|
              pg.level = genre_info['genreLevel']
            end
          end

          puts 'ジャンルとProductGenreが正常に追加されました。'

          # AIレビュー
          AnalyzeReviewsJob.perform_async(review_slug, product.id)
        end
      end
    rescue StandardError => e
      puts "楽天APIリクエスト中にエラーが発生しました: #{e.message}"
    end
  end
end
