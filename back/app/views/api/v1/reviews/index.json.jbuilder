json.array!(@reviews) do |review|
  json.id review.id
  json.description review.description
  json.rating review.rating
  json.bought_date review.bought_date
  json.user do
    json.id review.user.id
    json.username review.user.username
  end
  json.created_at review.created_at
  json.updated_at review.updated_at
end
