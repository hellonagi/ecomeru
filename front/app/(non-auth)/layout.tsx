import { Container } from '@mantine/core'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Container size="sm">{children}</Container>
}