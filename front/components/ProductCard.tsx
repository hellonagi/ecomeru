import Link from 'next/link'
import {
  Card,
  Text,
  Title,
  Badge,
  Group,
  Stack,
  RingProgress,
} from '@mantine/core'
import Image from 'next/image'
import classes from './ProductCard.module.css'

export function ProductCard({ product }: any) {
  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      component={Link}
      href={`/products/${product.slug}`}
    >
      <Card.Section h={230} style={{ overflow: 'hidden' }} ta="center">
        <Image
          src={product.image.replace('128x128', '256x256')}
          alt={product.code}
          height={230}
          width={230}
        />
      </Card.Section>

      <Badge
        className={classes.rating}
        variant="gradient"
        gradient={{ from: 'cyan', to: 'blue' }}
      >
        {product.price}円
      </Badge>

      <Title order={3} size="h6" lineClamp={2} mt={8}>
        {product.name}
      </Title>

      <Card.Section p={12}>
        <StatsRing stat={product.analysis} />
      </Card.Section>
    </Card>
  )
}

export function StatsRing({ stat }: any) {
  return (
    <Group gap={8}>
      <RingProgress
        size={50}
        roundCaps
        thickness={8}
        sections={[
          { value: stat.positive, color: 'green.6' },
          { value: stat.neutral, color: 'yellow.6' },
          { value: stat.negative, color: 'red.6' },
        ]}
      />

      <Stack gap={0}>
        <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
          ポジティブレビュー
        </Text>
        <Text fw={700} size="xl" mt={-2}>
          {stat.positive}%
        </Text>
      </Stack>
    </Group>
  )
}
