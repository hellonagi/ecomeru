'use client'
import { useMantineTheme } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import { ProductCard } from './ProductCard'
import { useMediaQuery } from '@mantine/hooks'
import classes from './ProductCarousel.module.css'

export function ProductCarousel({ products }: any) {
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`)
  const tablet = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

  return (
    <Carousel
      withIndicators
      slideSize={{ base: '100%', xs: '49.8%', sm: '33.25%' }}
      slideGap={{ base: 'xs', xs: 'sm', sm: 'md' }}
      loop
      align="start"
      slidesToScroll={mobile ? 1 : tablet ? 2 : 3}
      mt={16}
      classNames={classes}
    >
      {products.map((product: any) => (
        <Carousel.Slide key={product.code}>
          <ProductCard product={product} />
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}
