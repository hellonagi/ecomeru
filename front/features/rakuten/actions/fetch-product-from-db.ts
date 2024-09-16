'use server'

export async function fetchProductFromDB(slug: string) {
  try {
    const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/products/${slug}`, {
      method: 'GET',
      next: { revalidate: 0 },
    })

    if (response.ok) {
      const data = await response.json()
      return data.product
    }

    return null
  } catch (error) {
    console.log('ERR2')
    console.error(error)
    return null
  }
}
