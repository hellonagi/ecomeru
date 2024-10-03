'use server'
import { z } from 'zod'
import { schema } from '../reviewSchema'
import getAuthCookies from '@/lib/getAuthCookies'
import { permanentRedirect } from 'next/navigation'

export async function postReview(
  prevState: {
    success: boolean
    message: string
    data?: z.infer<typeof schema>
    errors?: { description: string; bought_date: string }
  },
  {
    payload,
    product_slug,
  }: { payload: z.infer<typeof schema>; product_slug: string },
) {
  const { token, client, uid } = getAuthCookies()
  try {
    const response = await fetch(
      `${process.env.RAILS_API_URL}/api/v1/products/${product_slug}/review`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
          client,
          uid,
        },
        body: JSON.stringify({ review: payload }),
      },
    )

    if (response.ok) {
      return {
        ...prevState,
        success: true,
        message: 'レビューの投稿をしました。',
      }
    } else {
      return { ...prevState, success: false, message: 'Validation failed' }
    }
  } catch (error) {
    console.log(error)
    return { ...prevState, success: false, message: 'エラーが発生しました。' }
  }
}
