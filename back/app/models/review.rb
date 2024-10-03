class Review < ApplicationRecord
  validates :description, presence: true, length: { maximum: 400 }
  validates :rating, presence: true
  validates :bought_date, presence: true

  belongs_to :user
  belongs_to :product
end
