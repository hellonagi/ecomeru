json.array! @products.reverse do |product|
  json.id product.id
  json.name product.name
  json.slug product.slug
  json.code product.code
  json.catchcopy product.catchcopy
  json.price product.price
  json.image product.image
  json.review_average product.review_average
  json.review_count product.review_count
  json.item_url product.item_url
  json.review_slug product.review_slug
  json.created_at product.created_at
  json.updated_at product.updated_at

  if product.analysis
    json.analysis do
      json.id product.analysis.id
      json.positive product.analysis.positive
      json.neutral product.analysis.neutral
      json.negative product.analysis.negative
      json.summary product.analysis.summary
      json.sum_positive product.analysis.sum_positive
      json.sum_negative product.analysis.sum_negative
    end
  end
end
