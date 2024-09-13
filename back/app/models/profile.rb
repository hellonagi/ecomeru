class Profile < ApplicationRecord
  belongs_to :user
  belongs_to :country, optional: true
  belongs_to :machine, optional: true
  belongs_to :controller, optional: true

  validates :user_id, uniqueness: true
  validates :bio, length: { maximum: 140 }
  validates :youtube, length: { maximum: 32 }
  validates :twitch, length: { maximum: 32 }
  validates :twitter, length: { maximum: 32 }
end
