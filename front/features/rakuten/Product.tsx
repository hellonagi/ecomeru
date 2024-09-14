'use client'
import {
  Anchor,
  Grid,
  Flex,
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

export function Product({ product, shop, review_url }: any) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt={32}>
      <Title order={1} size="h3">
        {product.name}
      </Title>

      <Grid mt={32}>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <Image
            src={product.image.replace('128x128', '384x384')}
            width={256}
            height={256}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            alt={product.code}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>
          <Stack justify="space-between" h="100%">
            <Stack justify="flex-start" gap={4}>
              <Text>{product.catchcopy}</Text>
              <Group gap={8}>
                <Rating
                  size="md"
                  defaultValue={product.review_average}
                  fractions={2}
                  readOnly
                />
                <Text>({product.review_average})</Text>
                <Anchor href={review_url} target="_blank">
                  {product.review_count}件の評価
                </Anchor>
              </Group>
              <Text fz="h2" fw={600} c="red.9">
                {product.price}円
              </Text>
            </Stack>
            <Group wrap="nowrap">
              <Button
                component="a"
                href={product.item_url}
                leftSection={<IconExternalLink size={14} />}
                variant="default"
                target="_blank"
              >
                商品ページ
              </Button>
              <Button
                component="a"
                href={shop.url}
                leftSection={<IconExternalLink size={14} />}
                variant="default"
                target="_blank"
              >
                {shop.name}
              </Button>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  )
}
