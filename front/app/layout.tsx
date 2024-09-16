import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/carousel/styles.css'
import './global.css'
import React from 'react'
import { MantineProvider, ColorSchemeScript, Flex } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { AuthProvider } from '@/features/auth/AuthContext'
import { theme } from '../theme'
import Header from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

export const metadata = {
  title: 'ecomeru',
  description:
    'ecomeru は、膨大なECサイトのレビューをAI技術を用いて要約し、ユーザーが商品購入の意思決定を迅速かつ効率的に行えるようにサポートするサービスです。',
}

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
          <Notifications />
        </MantineProvider>
      </body>
    </html>
  )
}
