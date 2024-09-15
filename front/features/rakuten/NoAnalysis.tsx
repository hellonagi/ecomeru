'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, Text, Title } from '@mantine/core'

export function NoAnalysis() {
  const router = useRouter()

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt={32}>
      <Title order={2} size="h3">
        AI分析
      </Title>
      <Text c="dimmed" fz="xs">
        レビュー数が5件未満のため、AI分析を行うことができません。
      </Text>
    </Card>
  )
}
