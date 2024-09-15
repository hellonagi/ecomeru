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

    uri = URI("https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?format=json&itemCode=#{itemid}&applicationId=#{application_id}&affiliateId=#{affiliate_id}")

    begin
      # GETリクエストを送信
      response = Net::HTTP.get(uri)
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

        if product.save
          puts '商品が正常に追加されました。'

          # ショップを探すか新規作成
          shop = Shop.find_or_initialize_by(code: item_data['shopCode']) do |s|
            s.name = item_data['shopName']
            s.url = item_data['shopUrl']
          end

          if shop.save
            puts 'ショップが正常に追加または更新されました。'

            # 中間テーブルへのリレーションを作成
            product.shops << shop unless product.shops.include?(shop)
            puts 'products_shopsにデータが追加されました。'

            AnalyzeReviewsJob.perform_async(review_slug, product.id)
          else
            puts shop.errors.full_messages
          end
        else
          puts product.errors.full_messages
        end
      end
    rescue StandardError => e
      puts "楽天APIリクエスト中にエラーが発生しました: #{e.message}"
    end
  end
end
