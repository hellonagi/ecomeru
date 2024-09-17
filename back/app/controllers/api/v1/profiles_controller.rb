class Api::V1::ProfilesController < ApplicationController
  before_action :authenticate_api_v1_user!, only: %i[show update]

  def show
    render :show
  end

  def update
    if username_updatable?
      ApplicationRecord.transaction do
        user_update_params = {
          username: profile_params[:username],
          nickname: profile_params[:nickname],
          username_created_at: current_api_v1_user.username_created_at || Time.current,
          username_updated_at: Time.current
        }

        if current_api_v1_user.update!(user_update_params)
          profile = Profile.find_or_initialize_by(user_id: current_api_v1_user.id)
          profile_update_params = {
            bio: profile_params[:bio],
            twitter: profile_params[:twitter]
          }

          profile.update!(profile_update_params)
          render json: { success: true, message: 'プロフィールのアップデートに成功しました。', user: current_api_v1_user }, status: :ok
        end
      rescue ActiveRecord::RecordInvalid => e
        render json: { success: false, errors: e.record.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { success: false, errors: { username: 'ユーザー名は30日に1回しか変更できません。' } }, status: :forbidden
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:username, :nickname, :bio, :twitter)
  end

  def username_updatable?
    # リクエストされたusernameと現在のusernameが異なるかを確認
    requested_username = profile_params[:username]
    current_username = current_api_v1_user.username

    # usernameが変更されているかどうかを確認
    # username_updated_atが30日以内かどうかを確認
    if requested_username != current_username && (current_api_v1_user.username_updated_at.present? && current_api_v1_user.username_updated_at > 30.days.ago)
      return false
    end

    # 30日以上経っている場合は更新を許可
    true
  end
end
