import {
  Avatar,
  Text,
  Button,
  Title,
  Card,
  Group,
  Stack,
  Rating,
  Tabs,
  rem,
} from '@mantine/core'
import {
  IconPhoto,
  IconExternalLink,
  IconMessageCircle,
  IconSettings,
  IconBrandTwitter,
  IconBrandDiscord,
} from '@tabler/icons-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { fetchProduct } from '@/features/rakuten/actions/fetch-product'

export default async function Page({ params }: { params: { slug: string } }) {
  console.log('page', params.slug)
  const slug = params.slug
  const product = await fetchProduct(slug)
  console.log(product)

  if (!product) {
    notFound()
  }

  console.log(product)

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder mt={32}>
        <Title order={1} size="h2">
          {product.name}
        </Title>
        <Group>
          <Image
            src={product.image.replace('128x128', '256x256')}
            width={256}
            height={256}
            alt="Picture of the author"
          />
          <Stack>
            <Text>{product.catchcopy}</Text>
            <Group>
              <Text fz="lg" fw={500}>
                {product.price}円
              </Text>
              <Rating
                defaultValue={product.review_average}
                fractions={2}
                readOnly
              />
              <div>({product.review_average})</div>
            </Group>
            <Group>
              <Button
                component="a"
                href="https://mantine.dev"
                leftSection={<IconExternalLink size={14} />}
                variant="default"
              >
                商品ページ
              </Button>
              <Button
                component="a"
                href={product.shops[0].url}
                leftSection={<IconExternalLink size={14} />}
                variant="default"
              >
                ストアページ {product.shops[0].name}
              </Button>
            </Group>
          </Stack>
        </Group>
      </Card>
    </>
  )
}
