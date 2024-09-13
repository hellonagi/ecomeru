'use server'

export async function fetchProfile(username: string) {
  try {
    const response = await fetch(`http://back:3000/api/v1/users/${username}`, {
      method: 'GET',
    })

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
