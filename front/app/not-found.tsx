import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from '@mantine/core'
import classes from './NotFound.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404',
}

export default function Page() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src="/404.svg" className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>ご指定のページは見つかりません...</Title>
          <Text c="dimmed" size="lg">
            申し訳ございません。アクセスされたページは見つかりませんでした。
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
          >
            トップページへ戻る
          </Button>
        </div>
        <Image src="/404.svg" className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  )
}
