'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, Loader, Flex } from '@mantine/core'
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
      <Flex align="center" gap={8}>
        <Loader color="blue" />
        {message}
      </Flex>
    </Card>
  )
}
