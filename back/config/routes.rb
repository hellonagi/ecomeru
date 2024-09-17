Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        omniauth_callbacks: 'api/v1/auth/omniauth_callbacks'
      }
      resource :user, only: %i[update]
      resources :users, only: %i[show]

      resource :profile, only: %i[show update]

      get '/products/recent', to: 'products#recent', as: 'recent'
      get '/products/positive', to: 'products#positive', as: 'positive'
      resources :products, only: %i[show create]
    end
  end
end
