import { Container, Group, Text } from '@mantine/core'

import classes from './Footer.module.css'

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Text c="dimmed" size="sm">
          © 2024 n2dev. All rights reserved.
        </Text>
      </Container>
    </footer>
  )
}
