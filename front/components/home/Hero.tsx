import cx from 'clsx'
import { Title, Text, Container, Button, Overlay } from '@mantine/core'
import classes from './Hero.module.css'
import { SearchInput } from '@/features/rakuten/SearchInput'

export function Hero() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#966" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Automated AI code reviews for{' '}
          <Text component="span" inherit className={classes.highlight}>
            any stack
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            楽天市場で検索したいURLを入力してください
          </Text>
        </Container>

        <Container size="xs" mt={32}>
          <SearchInput />
        </Container>
      </div>
    </div>
  )
}
