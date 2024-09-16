import { Container } from '@mantine/core'
import { Features } from '@/components/home/Features'
import { Hero } from '@/components/home/Hero'
import { RecentProducts } from '@/features/rakuten/RecentProducts'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Container size="md" py="xl">
        <Features />
        <RecentProducts />
      </Container>
    </>
  )
}
