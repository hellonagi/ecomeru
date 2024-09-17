'use server'
import { z } from 'zod'
import { schema } from '../profileSchema'
import getAuthCookies from '@/lib/getAuthCookies'
import { permanentRedirect } from 'next/navigation'

export async function postProfile(
  prevState: {
    success: boolean
    message: string
    data?: z.infer<typeof schema>
    errors?: { username: string }
  },
  payload: z.infer<typeof schema>,
) {
  const { token, client, uid } = getAuthCookies()
  try {
    const response = await fetch(
      `${process.env.RAILS_API_URL}/api/v1/profile`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
          client,
          uid,
        },
        body: JSON.stringify({ profile: payload }),
      },
    )

    const state = await response.json()
    return state
  } catch (error) {
    console.log(error)
  }

  return { success: false, message: 'Validation failed' }
}
