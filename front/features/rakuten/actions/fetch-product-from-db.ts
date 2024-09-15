'use server'

export async function fetchProductFromDB(slug: string) {
  try {
    const response = await fetch(`http://back:3000/api/v1/products/${slug}`, {
      method: 'GET',
      cache: 'no-store',
    })

    if (response.ok) {
      const data = await response.json()
      return data.product
    }

    return null
  } catch (error) {
    console.log('ERR')
    console.error(error)
    return null
  }
}
