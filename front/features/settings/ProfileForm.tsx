'use client'
import { useRef, useEffect, startTransition } from 'react'
import { useFormState } from 'react-dom'
import { Card, Title, TextInput, Textarea, Button, Group } from '@mantine/core'
import { postProfile } from '@/features/settings/actions/post-profile'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { schema } from './profileSchema'
import { notifications } from '@mantine/notifications'
import classes from './ProfileForm.module.css'

type ProfileSchema = z.infer<typeof schema>

export default function ProfileForm({ profile }: { profile: ProfileSchema }) {
  const [state, formAction] = useFormState(postProfile, profile)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(schema),
    defaultValues: profile,
  })

  const onSubmit: SubmitHandler<ProfileSchema> = async (payload) => {
    startTransition(() => {
      formAction(payload)
    })
  }

  useEffect(() => {
    if (state.message && state.success) {
      notifications.show({
        message: state.message,
      })
    }
  }, [state])

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt={32} p={32}>
      <Title order={2}>プロフィール設定</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          mt={24}
          size="md"
          label="ユーザー名"
          placeholder="username"
          variant="filled"
          withAsterisk
          error={errors.username?.message || state.errors?.username}
          {...register('username')}
          classNames={{ input: classes.input, wrapper: classes.wrapper }}
        />

        <TextInput
          mt={24}
          size="md"
          label="表示名"
          placeholder="表示名を入力"
          variant="filled"
          error={errors.nickname?.message}
          {...register('nickname')}
        />

        <Textarea
          mt={24}
          size="md"
          label="自己紹介"
          placeholder="自己紹介を入力"
          variant="filled"
          error={errors.bio?.message}
          {...register('bio')}
        />

        <Group>
          <TextInput
            mt={24}
            size="md"
            w={300}
            label="X(Twitter)ユーザー名"
            placeholder="@なしで入力"
            variant="filled"
            error={errors.twitter?.message}
            {...register('twitter')}
          />
        </Group>

        <Group mt="xl">
          <Button type="submit" size="md">
            更新する
          </Button>
        </Group>
      </form>
    </Card>
  )
}
