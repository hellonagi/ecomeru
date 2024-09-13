'use server'

export async function checkRoles(token: string, client: string, uid: string) {
  try {
    const response = await fetch(
      'http://back:3000/api/v1/auth/validate_token',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'access-token': token,
          client,
          uid,
        },
      },
    )

    const data = await response.json()

    if (!data.success) {
      throw new Error('User validation failed.')
    }

    const userRole = {
      message: 'User role fetched',
      is_validated: true,
      username: data.data.username,
      is_admin: data.data.is_admin,
      is_moderator: data.data.is_moderator,
      is_host: data.data.is_host,
    }

    return userRole
  } catch (error) {
    console.error(error)
    return {
      message: 'Faild to fetch user role.',
      username: null,
      is_validated: false,
      is_admin: false,
      is_moderator: false,
      is_host: false,
    }
  }
}
