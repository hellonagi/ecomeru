import { cookies } from 'next/headers'

export default function getAuthCookies() {
  const cookieStore = cookies()
  return {
    token: cookieStore.get('access-token')?.value || '',
    client: cookieStore.get('client')?.value || '',
    uid: cookieStore.get('uid')?.value || '',
  }
}
