json.profile do
  json.username current_api_v1_user.username
  json.nickname current_api_v1_user.nickname
  json.bio current_api_v1_user.profile.bio
  json.twitter current_api_v1_user.profile.twitter
end
