'use server'

export async function fetchProfile(username: string) {
  try {
    const response = await fetch(
      `${process.env.RAILS_API_URL}/api/v1/users/${username}`,
      {
        method: 'GET',
        next: { revalidate: 0 },
      },
    )

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error)
    }

    return data.profile
  } catch (error) {
    console.error(error)
    return null
  }
}
