'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, Loader, Flex } from '@mantine/core'

export function LoadingAnalysis() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.refresh()
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt={32}>
      <Flex align="center" gap={8}>
        <Loader color="blue" ml={8} />
        現在商品のレビューを分析中です。
      </Flex>
    </Card>
  )
}
