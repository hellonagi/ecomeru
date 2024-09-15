import { Container, Group, Text } from '@mantine/core'

import classes from './Footer.module.css'

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group gap={0} className={classes.links} justify="center" wrap="nowrap">
          <Text c="dimmed" size="sm">
            © 2024 n2dev. All rights reserved.
          </Text>
        </Group>
      </Container>
    </div>
  )
}
