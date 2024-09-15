class Genre < ApplicationRecord
  validates :name, presence: true, length: { maximum: 64 }
  validates :code, presence: true

  has_many :product_genres
  has_many :products, through: :product_genres
end
