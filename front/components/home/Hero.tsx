import cx from 'clsx'
import { Title, Text, Container, Button, Overlay } from '@mantine/core'
import classes from './Hero.module.css'
import { SearchInput } from '@/features/rakuten/SearchInput'
import bg from '@/assets/images/bg.avif'

export function Hero() {
  return (
    <div
      className={classes.wrapper}
      style={{
        backgroundImage: `url(${bg.src})`,
        width: '100%',
        height: '100%',
      }}
    >
      <Overlay color="#116" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>無料のオンラインAIレビュー分析</Title>

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
