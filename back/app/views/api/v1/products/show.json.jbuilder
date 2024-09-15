json.product do
  json.id @product.id
  json.name @product.name
  json.slug @product.slug
  json.code @product.code
  json.catchcopy @product.catchcopy
  json.price @product.price
  json.image @product.image
  json.review_average @product.review_average
  json.review_count @product.review_count
  json.item_url @product.item_url
  json.review_slug @product.review_slug
  json.created_at @product.created_at
  json.updated_at @product.updated_at

  json.shops @product.shops, :id, :name, :code, :url

  sorted_genres = @product.genres.sort_by do |genre|
    product_genre = @product.product_genres.find { |pg| pg.genre_id == genre.id }
    product_genre ? product_genre.level : Float::INFINITY # product_genreがnilなら最大値にする
  end

  json.genres sorted_genres do |genre|
    product_genre = @product.product_genres.find { |pg| pg.genre_id == genre.id }
    if product_genre
      json.id genre.id
      json.name genre.name
      json.code genre.code
      json.level product_genre.level
    else
      json.id genre.id
      json.name genre.name
      json.code genre.code
      json.level nil # 見つからなかった場合に nil を設定
    end
  end

  if @analysis
    json.analysis do
      json.id @analysis.id
      json.positive @analysis.positive
      json.neutral @analysis.neutral
      json.negative @analysis.negative
      json.summary @analysis.summary
      json.sum_positive @analysis.sum_positive
      json.sum_negative @analysis.sum_negative
    end
  end
end
