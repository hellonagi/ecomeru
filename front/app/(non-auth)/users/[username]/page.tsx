import { Avatar, Text, Group, Tabs, rem } from '@mantine/core'
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconBrandTwitter,
  IconBrandDiscord,
} from '@tabler/icons-react'
import { notFound } from 'next/navigation'
import { fetchProfile } from '@/features/profile/actions/fetch-profile'

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
    <div>
      <Group wrap="nowrap" mt={64} mb={16}>
        <Avatar src={profile.image} size={94} radius="md" />
        <div>
          <Text fz="lg" fw={500}>
            {profile.nickname}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <Text fz="sm">{profile.bio}</Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={3}>
            <Group wrap="nowrap" gap={5} mt={5}>
              <IconBrandTwitter stroke={1.5} />
              <Text fz="xs" c="dimmed">
                {profile.twitter}
              </Text>
            </Group>
            <Group wrap="nowrap" gap={5} mt={5}>
              <IconBrandDiscord stroke={1.5} size="1rem" />
              <Text fz="xs" c="dimmed">
                {profile.discord}
              </Text>
            </Group>
          </Group>
        </div>
      </Group>
      {/* <EditButton profileId={id} /> */}
      {/* <ProfileTabs /> */}
    </div>
  )
}
