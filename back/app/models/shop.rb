class Shop < ApplicationRecord
  validates :name, presence: true, length: { maximum: 128 }
  validates :code, presence: true, length: { maximum: 128 }
  validates :url, presence: true, length: { maximum: 256 }

  has_many :product_shops
  has_many :products, through: :product_shops
end
