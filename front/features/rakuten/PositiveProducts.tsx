import { Title } from '@mantine/core'
import { fetchProducts } from './actions/fetch-products'
import { ProductCarousel } from '@/components/ProductCarousel'

export async function PositiveProducts() {
  const products = await fetchProducts('positive')

  return (
    <>
      <Title order={2} size="h3" mt={64}>
        ポジティブレビューの多い商品
      </Title>
      <ProductCarousel products={products} />
    </>
  )
}
