import { notFound } from 'next/navigation'
import { fetchProduct } from '@/features/rakuten/actions/fetch-product'
import { Product } from '@/features/rakuten/Product'
import { Analysis } from '@/features/rakuten/Analysis'

export default async function Page({ params }: { params: { slug: string } }) {
  console.log('page', params.slug)
  const slug = params.slug
  const product = await fetchProduct(slug)

  if (!product) {
    notFound()
  }

  const shop = product.shops[0]
  const analysis = product.analysis
  const review_url = `https://review.rakuten.co.jp/item/1/${product.review_slug}/`

  return (
    <>
      {product && <Product product={product} shop={shop} review_url={review_url} />}
      {analysis && <Analysis analysis={analysis} />}
    </>
  )
}
