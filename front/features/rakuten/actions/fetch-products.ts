'use server'

export async function fetchProducts(endpoint: 'positive' | 'recent') {
  try {
    const response = await fetch(
      `${process.env.RAILS_API_URL}/api/v1/products/${endpoint}`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.log('ERR3')
    console.error(error)
    return null
  }
}
