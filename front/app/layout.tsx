import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/carousel/styles.css'
import React from 'react'
import { MantineProvider, ColorSchemeScript, Flex } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { AuthProvider } from '@/features/auth/AuthContext'
import { theme } from '../theme'
import Header from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

export const metadata = {
  title: 'AIレビュー分析',
  description:
    'AIレビュー分析は、AI技術を活用してレビューを分析し、ポジティブ・ネガティブな意見を可視化するサービスです。',
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
