json.extract! @review, :id, :description, :rating, :bought_date, :created_at
json.user do
  json.extract! @review.user, :id, :name, :nickname
end
json.product do
  json.extract! @review.product, :id, :name, :slug
end
