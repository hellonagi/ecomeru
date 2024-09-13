'use server'
import { z } from 'zod'
import { schema } from '@/schemas/initSchema'
import getAuthCookies from '@/lib/getAuthCookies'
import { permanentRedirect } from 'next/navigation'

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
      const response = await fetch('http://back:3000/api/v1/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
          client,
          uid,
        },
        body: JSON.stringify({ user: parsed.data }),
      })
      const data = await response.json()

      if (!data.success) {
        return data
      }
    } catch (error) {
      // Server Errors, Active Record Errors, etc.
      return {
        success: false,
        message: 'Something went wrong. Please try again later.',
      }
    }

    permanentRedirect(`/users/${parsed.data.username}`)
  } else {
    return { success: false, message: 'Validation failed' }
  }
}
