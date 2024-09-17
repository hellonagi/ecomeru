'use client'
import { Avatar, Card, Text, Button, Group, rem, Box } from '@mantine/core'
import { Profile } from './profile.interface'
import classes from './ProfileCard.module.css'
import { IconBrandTwitter } from '@tabler/icons-react'
import { useAuth } from '@/features/auth/AuthContext'
import Link from 'next/link'

export default function ProfileCard({
  profile,
  username,
}: {
  profile: Profile
  username: string
}) {
  const { currentUser } = useAuth()

  return (
    <Card withBorder mt={64}>
      <Card.Section bg="blue.2" h={100} />
      <Avatar
        src={profile.image}
        size={94}
        radius={94}
        variant="outline"
        mt={-48}
        ml={24}
        bg="white"
        className={classes.avatar}
      />
      <Group mt={-32} justify="end">
        {profile.twitter && (
          <Button
            component="a"
            href={`https://x.com/${profile.twitter}`}
            leftSection={<IconBrandTwitter />}
            variant="outline"
            size="xs"
          >
            @{profile.twitter}
          </Button>
        )}
        {currentUser && (
          <Button
            component={Link}
            href={`/settings`}
            variant="outline"
            size="xs"
          >
            プロフィールを編集
          </Button>
        )}
      </Group>
      <Box ml={12}>
        <Text fz="lg" fw={500}>
          {profile.nickname}
        </Text>
        <Text fz="md" fw={400} c="gray.6" mt={-4}>
          @{username}
        </Text>
        <Text mt={16}>
          {profile.bio || 'プロフィール欄はまだ記入されていません。'}
        </Text>
      </Box>
    </Card>
  )
}
