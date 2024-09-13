Rails.application.config.middleware.use OmniAuth::Builder do
  provider :discord, ENV['DISCORD_KEY'], ENV['DISCORD_SECRET'], scope: 'identify'
end
