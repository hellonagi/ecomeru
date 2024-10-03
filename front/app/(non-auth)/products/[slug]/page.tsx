import { notFound } from 'next/navigation'
import { fetchProductFromDB } from '@/features/rakuten/actions/fetch-product-from-db'
import { validateURL } from '@/features/rakuten/actions/validate-url'
import { createProduct } from '@/features/rakuten/actions/create-product'
import { Product } from '@/features/rakuten/Product'
import { Analysis } from '@/features/rakuten/Analysis'
import { Reviews } from '@/features/rakuten/Reviews'
import ReviewForm from '@/features/rakuten/ReviewForm'
import { LoadingProduct } from '@/features/rakuten/LoadingProduct'
import { LoadingAnalysis } from '@/features/rakuten/LoadingAnalysis'
import { NoAnalysis } from '@/features/rakuten/NoAnalysis'
import { fetchReviews } from '@/features/rakuten/actions/fetch-reviews'

export default async function Page({ params }: { params: { slug: string } }) {
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

  const reviews = await fetchReviews(slug)

  const shop = product.shops[0]
  const review_url = `https://review.rakuten.co.jp/item/1/${product.review_slug}/`
  const analysisComponent = await getAnalysisComponent(product)

  return (
    <>
      <Product product={product} shop={shop} review_url={review_url} />
      {analysisComponent}
      <Reviews reviews={reviews} product_slug={product.slug} />
      <ReviewForm reviews={reviews} product_slug={product.slug} />
    </>
  )
}

async function getAnalysisComponent(product: any) {
  if (product.review_count > 5) {
    return product.analysis ? (
      <Analysis analysis={product.analysis} />
    ) : (
      <LoadingAnalysis />
    )
  } else {
    return <NoAnalysis />
  }
}
