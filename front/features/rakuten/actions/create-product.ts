'use server'

export async function createProduct(
  itemid: string,
  review_slug: string,
  slug: string,
) {
  try {
    const res = await fetch(`http://back:3000/api/v1/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: {
          itemid: itemid,
          review_slug: review_slug,
          slug: slug,
        },
      }),
      cache: 'no-store',
    })

    if (res.ok) {
      return '現在商品データを取得しています。しばらくお待ち下さい。'
    }
  } catch (error) {
    console.log('ERR')
    console.error(error)
  }
  return 'データの取得に失敗しました。時間をおいてから再度お試しください。'
}
