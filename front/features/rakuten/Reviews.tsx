'use client'
import { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Text,
  Title,
  Group,
  Paper,
  Rating,
} from '@mantine/core'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { useAuth } from '../auth/AuthContext'
import { deleteReview } from './actions/delete-review'
import { notifications } from '@mantine/notifications'

export function Reviews({
  reviews,
  product_slug,
}: {
  reviews: any
  product_slug: string
}) {
  const { currentUser } = useAuth()
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = window.confirm('本当に削除しますか？')

    if (confirmed) {
      setDeleting(true)
      try {
        await deleteReview(product_slug)

        notifications.show({
          message: 'レビューが削除されました。',
        })

        router.refresh()
      } catch (error) {
        console.error(error)
        notifications.show({
          message: 'レビューの削除に失敗しました。',
          color: 'red',
        })
      } finally {
        setDeleting(false)
      }
    }
  }

  if (reviews.length > 0) {
    return (
      <Paper withBorder p="md" radius="md" mt={24} mb={24}>
        <Title order={2} size="h3">
          ecomeruユーザーレビュー
        </Title>

        <Text fz="sm"></Text>
        {reviews.map((review: any) => {
          let avatar =
            review.user.image ||
            `https://cdn.discordapp.com/embed/avatars/${Math.floor(review.user.id % 5)}.png`

          const boughtDate = format(
            new Date(review.bought_date),
            'yyyy年M月d日',
            { locale: ja },
          )

          const reviewDate = format(
            new Date(review.created_at),
            'yyyy年M月d日',
            { locale: ja },
          )

          return (
            <Box key={review.id}>
              <Divider mt={24} />
              <Box mt={24}>
                <Group>
                  <Avatar src={avatar} alt={review.user.nickname} radius="xl" />
                  <Box>
                    <Text size="sm">{review.user.nickname}</Text>
                    <Group>
                      <Text size="xs" c="dimmed">
                        購入日: {boughtDate}
                      </Text>
                      <Text size="xs" c="dimmed">
                        レビュー日: {reviewDate}
                      </Text>
                    </Group>
                    <Group gap={8}>
                      <Rating size="md" defaultValue={review.rating} readOnly />
                      <Text c="dimmed" fw={600}>
                        {review.rating}
                      </Text>
                    </Group>
                  </Box>
                </Group>
                <Text pl={54} pt="sm" size="sm">
                  {review.description}
                </Text>
                {currentUser?.username == review.user.username && (
                  <Group justify="flex-end">
                    <Button
                      size="xs"
                      variant="filled"
                      color="red.5"
                      onClick={handleDelete}
                      disabled={deleting}
                    >
                      投稿を削除
                    </Button>
                  </Group>
                )}
              </Box>
            </Box>
          )
        })}
      </Paper>
    )
  } else {
    return (
      <Paper withBorder p="md" radius="md" mt={24} mb={24}>
        <Title order={1} size="h3">
          ecomeruユーザーレビュー
        </Title>
        <Text fz="sm" mt={6} c="dimmed">
          ユーザーレビューがまだありません。
        </Text>
      </Paper>
    )
  }
}
