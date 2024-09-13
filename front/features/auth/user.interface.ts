export interface DiscordUser {
  uid: string
  name: string
  username: string
  nickname: string | null
  image: string | null
  auth_token: string
  client_id: string
  expiry: number
  config: string | null
  message: string
}

export interface User
  extends Pick<DiscordUser, 'name' | 'nickname' | 'image' | 'uid'> {}
