'use client'
import {
  Progress,
  Box,
  Text,
  Title,
  Group,
  Paper,
  SimpleGrid,
} from '@mantine/core'
import {
  IconDeviceAnalytics,
  IconMoodSad,
  IconMoodEmpty,
  IconMoodSmile,
} from '@tabler/icons-react'
import classes from './Analysis.module.css'

export function Analysis({ analysis }: any) {
  const data = [
    {
      label: 'ポジティブ',
      part: analysis.positive,
      color: '#4CAF50',
      icon: <IconMoodSmile />,
    },
    {
      label: '中立',
      part: analysis.neutral,
      color: '#9E9E9E',
      icon: <IconMoodEmpty />,
    },
    {
      label: 'ネガティブ',
      part: analysis.negative,
      color: '#F44336',
      icon: <IconMoodSad />,
    },
  ]

  const segments = data.map((segment) => (
    <Progress.Section
      value={segment.part}
      color={segment.color}
      key={segment.color}
    >
      {segment.part > 10 && <Progress.Label>{segment.part}%</Progress.Label>}
    </Progress.Section>
  ))

  const descriptions = data.map((stat) => (
    <Box
      key={stat.label}
      style={{ borderBottomColor: stat.color }}
      className={classes.stat}
    >
      <Group justify="space-between" align="flex-end" gap={0}>
        <Group gap={4}>
          {stat.icon}
          <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
            {stat.label}
          </Text>
        </Group>

        <Text c={stat.color} fw={700} size="sm" className={classes.statCount}>
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ))

  return (
    <Paper withBorder p="md" radius="md" mt={24}>
      <Group justify="space-between">
        <Group align="flex-end" gap="xs">
          <Title order={2} size="h3">
            AI分析
          </Title>
        </Group>
        <IconDeviceAnalytics
          size="1.4rem"
          className={classes.icon}
          stroke={1.5}
        />
      </Group>

      <Text c="dimmed" fz="xs">
        AIの分析は必ずしも正しいとは限りません。
      </Text>

      <Progress.Root
        size={34}
        classNames={{ label: classes.progressLabel }}
        mt={32}
      >
        {segments}
      </Progress.Root>
      <SimpleGrid cols={{ base: 1, xs: 3 }} mt={16}>
        {descriptions}
      </SimpleGrid>

      <Title order={3} size="h4" mt={32}>
        全体の意見
      </Title>
      <Text fz="sm">{analysis.summary}</Text>
      <Title order={3} size="h4" mt={32}>
        ポジティブな意見
      </Title>
      <Text fz="sm">{analysis.sum_positive}</Text>
      <Title order={3} size="h4" mt={32}>
        ネガティブな意見
      </Title>
      <Text fz="sm">{analysis.sum_negative}</Text>
    </Paper>
  )
}
