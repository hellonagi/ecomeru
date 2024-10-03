'use server'
import getAuthCookies from '@/lib/getAuthCookies'

export async function deleteReview(product_slug: string) {
  const { token, client, uid } = getAuthCookies()
  try {
    const response = await fetch(
      `${process.env.RAILS_API_URL}/api/v1/products/${product_slug}/review`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
          client,
          uid,
        },
      },
    )

    const state = await response.json()
    return state
  } catch (error) {
    console.log(error)
  }

  return { success: false, message: 'Validation failed' }
}
