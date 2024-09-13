class Api::V1::Auth::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
  include ActionView::Layouts
  include ActionController::Rendering

  def omniauth_success
    get_resource_from_auth_hash
    set_token_on_resource
    create_auth_params

    if confirmable_enabled?
      # don't send confirmation email!!!
      @resource.skip_confirmation!
    end

    sign_in(:user, @resource, store: false, bypass: false)

    @resource.save!

    yield @resource if block_given?

    # Only include specific fields in the response
    filtered_data = {
      uid: @resource.uid,
      name: @resource.name,
      username: @resource.username,
      nickname: @resource.nickname,
      image: @resource.image
    }

    render_data_or_redirect('deliverCredentials', @auth_params.as_json, filtered_data)
  end
end
