class ProductGenre < ApplicationRecord
  validates :level, presence: true

  belongs_to :product
  belongs_to :genre
end
