'use server'

export async function fetchMyProfile(
  token: string,
  client: string,
  uid: string,
) {
  try {
    const response = await fetch(
      `${process.env.RAILS_API_URL}/api/v1/profile`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'access-token': token,
          client,
          uid,
        },
        next: { revalidate: 0 },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch my profile')
    }

    const data = await response.json()
    return data.profile
  } catch (error) {
    console.error(error)
    return null
  }
}
