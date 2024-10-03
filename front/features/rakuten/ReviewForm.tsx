'use client'
import { useEffect, startTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import {
  Anchor,
  Box,
  Card,
  Title,
  Text,
  Textarea,
  Button,
  Group,
  Rating,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import 'dayjs/locale/ja'
import { postReview } from '@/features/rakuten/actions/post-review'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { schema } from './reviewSchema'
import { notifications } from '@mantine/notifications'
import { useAuth } from '../auth/AuthContext'

type ReviewSchema = z.infer<typeof schema>

const initialState = {
  success: false,
  message: '',
  errors: { description: '', bought_date: '' },
}

export default function ReviewForm({
  product_slug,
  reviews,
}: {
  product_slug: string
  reviews: any
}) {
  const { currentUser, login } = useAuth()
  const router = useRouter()

  const [state, formAction] = useFormState(postReview, initialState)

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReviewSchema>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<ReviewSchema> = async (payload) => {
    startTransition(() => {
      formAction({ payload, product_slug })
    })
  }

  useEffect(() => {
    if (state.message && state.success) {
      notifications.show({
        message: state.message,
      })
      router.refresh()
    }
  }, [state])

  const hasMyReview = reviews.some(
    (review: any) => review.user.username === currentUser?.username,
  )

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder mt={32} mb={32}>
      <Title order={2} size="h3">
        レビュー投稿
      </Title>

      {currentUser ? (
        hasMyReview ? (
          <Text mt={24} size="md" c="dimmed" ta="center" mb={24}>
            既にレビューを投稿しています。
          </Text>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mt={24}>
              <Text fw={600}>満足度</Text>
              <input type="hidden" {...register('rating')} />
              <Rating
                count={5}
                size="lg"
                value={watch('rating')}
                onChange={(value) => setValue('rating', value)}
              />
              {errors.rating && (
                <span style={{ color: 'red' }}>{errors.rating.message}</span>
              )}
            </Box>

            <DateInput
              mt={24}
              size="md"
              label="購入日"
              placeholder="購入日を選択してください"
              locale="ja"
              valueFormat="YYYY/MM/DD"
              {...register('bought_date')}
              value={watch('bought_date') ?? null}
              onChange={(value) => setValue('bought_date', value ?? new Date())}
              error={errors.bought_date?.message || state.errors?.bought_date}
            />

            <Textarea
              mt={24}
              size="md"
              label="レビュー本文"
              placeholder="気に入ったこと/気に入らなかったことは何ですか？"
              variant="filled"
              withAsterisk
              error={errors.description?.message || state.errors?.description}
              {...register('description')}
            />

            <Group mt="xl">
              <Button type="submit" size="md">
                投稿する
              </Button>
            </Group>
          </form>
        )
      ) : (
        <Text mt={24} size="md" c="dimmed" ta="center" mb={24}>
          <Anchor onClick={login}>ログイン</Anchor>
          して投稿する
        </Text>
      )}
    </Card>
  )
}
