# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :trackable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: %i[discord]
  include DeviseTokenAuth::Concerns::User

  has_one :profile, dependent: :destroy # ProfileはUserに依存し、Userが削除されたらProfileも削除される

  validates :username, uniqueness: { message: '%<value>s has already been taken' },
                       length: { maximum: 16 }
  validates :nickname, length: { maximum: 16 }
end
