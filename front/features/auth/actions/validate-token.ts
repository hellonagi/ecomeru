'use server'

export async function validateToken(
  token: string,
  client: string,
  uid: string,
) {
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

    const filteredData = {
      success: true,
      message: 'User validated',
      user: {
        uid: data.data.uid,
        name: data.data.name,
        username: data.data.username,
        nickname: data.data.nickname,
        image: data.data.image,
      },
    }
    return filteredData
  } catch (error) {
    return {
      success: false,
      message: 'Failed to validate user.',
      user: null,
    }
  }
}
