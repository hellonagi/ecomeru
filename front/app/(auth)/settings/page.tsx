import { Title } from '@mantine/core'
import { postProfile } from '@/features/settings/actions/post-profile'
import ProfileForm from '@/features/settings/ProfileForm'
import { fetchMyProfile } from '@/features/settings/actions/fetch-my-profile'
import getAuthCookies from '@/lib/getAuthCookies'

export default async function Page() {
  const { token, client, uid } = getAuthCookies()
  const profile = await fetchMyProfile(token, client, uid)

  return (
    <>
      <ProfileForm profile={profile} />
    </>
  )
}
