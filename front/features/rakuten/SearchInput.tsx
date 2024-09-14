'use client'
import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  rem,
} from '@mantine/core'
import { useRouter } from 'next/navigation'
import { IconSearch, IconArrowRight } from '@tabler/icons-react'
import { schema } from './searchSchema'

export function SearchInput(props: TextInputProps) {
  const router = useRouter()
  const theme = useMantineTheme()

  function search(formData: any) {
    const data = formData.get('url')
    try {
      schema.parse({ url: data })
      // 正規表現でパス部分を抽出
      const match = data.match(
        /^https:\/\/item\.rakuten\.co\.jp\/([^/]+\/[^/]+)/,
      )

      if (match) {
        const result = match[1]
        const slug = result.replace('/', '-')
        router.push(`/products/${slug}`)
      } else {
        console.log('分析対象外のURLです。')
      }
    } catch (error) {
      alert('分析対象外のURLです。')
    }
  }

  return (
    <form action={search}>
      <TextInput
        name="url"
        radius="xl"
        size="md"
        placeholder="https://item.rakuten.co.jp/logicool/g-ppd-004wl-bk/"
        rightSectionWidth={42}
        leftSection={
          <IconSearch
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
            type="submit"
          >
            <IconArrowRight
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        }
        {...props}
      />
    </form>
  )
}
