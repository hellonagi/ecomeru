import { Card, Title } from '@mantine/core'
import { fetchRecentProducts } from './actions/fetch-recent-products'
import { ProductCarousel } from '@/components/ProductCarousel'

export async function RecentProducts() {
  const products = await fetchRecentProducts()

  return (
    <>
      <Title order={2} size="h3" mt={64}>
        最近のレビュー分析された商品
      </Title>
      <ProductCarousel products={products} />
    </>
  )
}
