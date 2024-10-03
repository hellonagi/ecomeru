'use server'
import { z } from 'zod'
import { schema } from '@/schemas/initSchema'
import getAuthCookies from '@/lib/getAuthCookies'

export async function initUsername(
  prevState: {
    success: boolean
    message: string
    data?: z.infer<typeof schema>
    errors?: { username: string }
  },
  formData: FormData,
) {
  const { token, client, uid } = getAuthCookies()
  const data = Object.fromEntries(formData)
  const parsed = await schema.safeParseAsync(data)

  if (parsed.success) {
    try {
      const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
          client,
          uid,
        },
        body: JSON.stringify({ user: parsed.data }),
      })

      if (response.ok) {
        return {
          success: true,
          message: '登録が完了しました。',
        }
      } else {
        return {
          success: false,
          message: 'Something went wrong. Please try again later.',
        }
      }
    } catch (error) {
      // Server Errors, Active Record Errors, etc.
      return {
        success: false,
        message: 'Something went wrong. Please try again later.',
      }
    }
  } else {
    return { success: false, message: 'Validation failed' }
  }
}
