'use server'

export async function fetchProduct(slug: string) {
  try {
    const response = await fetch(`http://back:3000/api/v1/products/${slug}`, {
      method: 'GET',
      cache: 'no-store',
    })

    if (response.ok) {
      console.log('found data')
      const data = await response.json()
      return data.product
    }

    const s = slug.replace('-', '/')
    console.log(s)

    const res = await fetch(`http://back:3000/api/v1/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: {
          url: `https://item.rakuten.co.jp/${slug.replace('-', '/')}/`,
          slug: slug,
        },
      }),
      cache: 'no-store',
    })

    const d = await res.json()
    console.log(d)

    return d.product
  } catch (error) {
    console.log('ERR')
    console.error(error)
    return null
  }
}
