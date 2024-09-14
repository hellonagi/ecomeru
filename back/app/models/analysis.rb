class Analysis < ApplicationRecord
  validates :product_id, uniqueness: true
  validates :summary, length: { maximum: 400 }
  validates :sum_positive,  length: { maximum: 400 }
  validates :sum_negative,  length: { maximum: 400 }
  validates :positive, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :neutral, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :negative, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }

  belongs_to :product
end
