'use client'
import { useRef, useEffect, startTransition } from 'react'
import { useFormState } from 'react-dom'
import { TextInput, Group, Button } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { schema } from '@/schemas/initSchema'
import { notifications } from '@mantine/notifications'
import classes from './initForm.module.css'

type AuthInitSchema = z.infer<typeof schema>

export default function InitForm({
  onFormAction,
}: {
  onFormAction: (
    prevState: {
      success: boolean
      message: string
      data?: AuthInitSchema
      errors?: { username: string }
    },
    data: FormData,
  ) => Promise<{
    success: boolean
    message: string
    data?: AuthInitSchema
    errors?: { username: string }
  }>
}) {
  const [state, formAction] = useFormState(onFormAction, {
    success: false,
    message: '',
    errors: { username: '' },
  })

  const {
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<AuthInitSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.message && state.success) {
      notifications.show({
        message: state.message,
      })
    }
  }, [state])

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <form ref={formRef} onSubmit={handleFormSubmit}>
      <TextInput
        label="ユーザー名"
        description="ユーザー名は30日に1回変更できます。"
        placeholder="username"
        withAsterisk
        variant="filled"
        error={errors.username?.message || state.errors?.username}
        {...register('username')}
        classNames={{ input: classes.input, wrapper: classes.wrapper }}
      />
      <TextInput
        mt="md"
        label="表示名"
        placeholder="表示名"
        variant="filled"
        error={errors.nickname?.message}
        {...register('nickname')}
      />

      <Group mt="xl">
        <Button
          type="submit"
          size="md"
          aria-disabled={isSubmitting || !isDirty || !isValid}
          disabled={isSubmitting || !isDirty || !isValid}
        >
          送信
        </Button>
      </Group>
    </form>
  )
}
