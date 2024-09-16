class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!, only: %i[update]

  def show
    user = User.find_by(username: params[:id])
    if user
      render json: { success: true, profile: build_profile(user) }
    else
      render json: { success: false, error: 'User not found' }, status: :not_found
    end
  end

  def update
    if username_updatable?
      update_params = user_params.merge(
        username_created_at: current_api_v1_user.username_created_at.nil? ? Time.current : current_api_v1_user.username_created_at,
        username_updated_at: Time.current
      )

      if current_api_v1_user.update(update_params)

        unless Profile.exists?(user_id: current_api_v1_user.id)
          profile = Profile.new(user_id: current_api_v1_user.id)
          profile.save!
        end

        render json: { success: true, message: 'User registered successfully.', user: current_api_v1_user }
      else
        # models/user.rbでvalidationの設定をしないと拾ってくれない
        render json: { success: false, errors: current_api_v1_user.errors }, status: :unprocessable_entity
      end
    else
      render json: { success: false, errors: { username: 'You can only update your username once every 30 days.' } },
             status: :forbidden
    end
  end

  private

  def build_profile(user)
    profile = user.profile
    {
      nickname: user.nickname,
      image: user.image,
      bio: profile.bio,
      youtube: profile.youtube,
      twitch: profile.twitch,
      twitter: profile.twitter,
      created_at: user.username_created_at
    }
  end

  def user_params
    params.require(:user).permit(:username, :nickname)
  end

  # Chek if username is updatable
  def username_updatable?
    return true if current_api_v1_user.username_updated_at.nil?

    days_since_last_update = (Time.current - current_api_v1_user.username_updated_at) / 1.day
    days_since_last_update >= 30
  end
end
