import { notFound } from 'next/navigation'
import { fetchProductFromDB } from '@/features/rakuten/actions/fetch-product-from-db'
import { validateURL } from '@/features/rakuten/actions/validate-url'
import { createProduct } from '@/features/rakuten/actions/create-product'
import { Product } from '@/features/rakuten/Product'
import { Analysis } from '@/features/rakuten/Analysis'
import { LoadingProduct } from '@/features/rakuten/LoadingProduct'
import { LoadingAnalysis } from '@/features/rakuten/LoadingAnalysis'
import { NoAnalysis } from '@/features/rakuten/NoAnalysis'

export default async function Page({ params }: { params: { slug: string } }) {
  console.log('page', params.slug)
  const slug = params.slug
  const product = await fetchProductFromDB(slug)

  if (!product) {
    // review_slugが存在するなら有効なurl
    const data = await validateURL(slug)

    if (data?.itemid && data.reviewSlug) {
      const message = await createProduct(data.itemid, data.reviewSlug, slug)
      return <LoadingProduct message={message} />
    } else {
      notFound()
    }
  }

  const shop = product.shops[0]
  const analysis = product.analysis
  const review_url = `https://review.rakuten.co.jp/item/1/${product.review_slug}/`

  return (
    <>
      {product && (
        <Product product={product} shop={shop} review_url={review_url} />
      )}
      {product.review_count > 5 ? (
        <>{analysis ? <Analysis analysis={analysis} /> : <LoadingAnalysis />}</>
      ) : (
        <NoAnalysis />
      )}
    </>
  )
}
