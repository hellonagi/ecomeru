import { notFound } from 'next/navigation'
import { fetchProfile } from '@/features/profile/actions/fetch-profile'
import ProfileCard from '@/features/profile/ProfileCard'

export default async function Page({
  params,
}: {
  params: { username: string }
}) {
  const username = params.username
  const profile = await fetchProfile(username)

  if (!profile) {
    notFound()
  }

  return (
    <>
      <ProfileCard profile={profile} username={username} />
    </>
  )
}
