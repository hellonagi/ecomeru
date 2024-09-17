'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, Text, Flex, Skeleton, Stack } from '@mantine/core'
export function LoadingProduct({ message }: { message: string }) {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.refresh()
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt={32}>
      <Skeleton height={22} radius="sm" />
      <Skeleton height={22} mt={12} radius="sm" />
      <Flex gap={20} mt={24}>
        <Skeleton width={200} height={200} radius="sm" />
        <Stack flex={1} gap={8}>
          <Skeleton height={16} radius="sm" />
          <Skeleton height={16} radius="sm" />
          <Flex gap={8}>
            <Skeleton height={16} width={64} radius="sm" />
            <Skeleton height={16} width={64} radius="sm" />
            <Skeleton height={16} width={64} radius="sm" />
            <Skeleton height={16} width={64} radius="sm" />
          </Flex>
          <Skeleton height={24} width={128} radius="sm" />
          <Skeleton height={24} width={96} radius="sm" />
          <Flex gap={16} mt="auto">
            <Skeleton height={34} width={125} radius="sm" />
            <Skeleton height={34} width={200} radius="sm" />
          </Flex>
        </Stack>
      </Flex>
    </Card>
  )
}
