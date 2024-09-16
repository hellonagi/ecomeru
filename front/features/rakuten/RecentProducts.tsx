import { Title } from '@mantine/core'
import { fetchProducts } from './actions/fetch-products'
import { ProductCarousel } from '@/components/ProductCarousel'

export async function RecentProducts() {
  const products = await fetchProducts('recent')

  return (
    <>
      <Title order={2} size="h3" mt={64}>
        最近レビュー分析された商品
      </Title>
      <ProductCarousel products={products} />
    </>
  )
}
