class Product < ApplicationRecord
  validates :name, presence: true, length: { maximum: 256 }
  validates :slug, presence: true, length: { maximum: 128 }, uniqueness: true
  validates :code, presence: true, length: { maximum: 128 }
  validates :catchcopy, length: { maximum: 256 }
  validates :price, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :image, length: { maximum: 256 }
  validates :review_average, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
  validates :review_count, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :item_url, length: { maximum: 256 }
  validates :review_slug, length: { maximum: 256 }

  has_many :product_shops
  has_many :shops, through: :product_shops
  has_one :analysis
  has_many :product_genres
  has_many :genres, through: :product_genres

  def level_in_product_genres
    product_genres.map do |pg|
      { genre_id: pg.genre_id, level: pg.level }
    end
  end
end
