import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
} from '@mantine/core'
import { IconAnalyze, IconStars, IconUser } from '@tabler/icons-react'
import classes from './Features.module.css'

const mockdata = [
  {
    title: 'AIレビュー分析＆要約',
    description:
      'ECサイトの膨大なレビューをAIが瞬時に分析し、要点をまとめた簡潔な要約を提供します。',
    icon: IconAnalyze,
  },
  {
    title: '3段階評価',
    description:
      'ポジティブ・ニュートラル・ネガティブの3段階で評価を表示、商品の特徴を分かりやすく提示します。',
    icon: IconStars,
  },
  {
    title: '使いやすいインターフェース',
    description:
      'URLを入力するだけで、誰でも簡単にAIによるレビュー分析を活用できます。',
    icon: IconUser,
  },
]

export function Features() {
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={'#228be6'}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ))

  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        レビューを読むのがめんどくさい？
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        AI分析でレビューの要点だけを掴み、短時間で自分に合う商品を見つけよう。
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  )
}
