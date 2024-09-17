'use client'

import cx from 'clsx'
import { useState } from 'react'
import {
  Group,
  Flex,
  Text,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Menu,
  UnstyledButton,
  Avatar,
  Skeleton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconLogout,
  IconSettings,
  IconChevronDown,
  IconUser,
} from '@tabler/icons-react'
import LoginButton from '@/features/auth/LoginButton'
import LogoutButton from '@/features/auth/LogoutButton'
import classes from './Header.module.css'
import { useAuth } from '@/features/auth/AuthContext'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const links = [
  { link: '/', label: 'Home' },
  { link: '/a', label: 'a' },
  { link: '/b', label: 'b' },
]

export default function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const { loading, currentUser, logout } = useAuth()

  // const items = links.map((link) => (
  //   <a
  //     key={link.label}
  //     href={link.link}
  //     className={classes.link}
  //     onClick={(event) => event.preventDefault()}
  //   >
  //     {link.label}
  //   </a>
  // ))

  return (
    <>
      <header className={classes.header}>
        <Group h="100%">
          <Flex flex={1} justify="start">
            <Text
              component={Link}
              href="/"
              className={inter.className}
              fw={600}
              size="lg"
            >
              ecomeru
            </Text>
          </Flex>

          {/* <Group flex={1} justify="center" h="100%" gap={0} visibleFrom="sm">
            {items}
          </Group> */}
          <Group flex={1} justify="end" visibleFrom="sm">
            {loading ? (
              <>
                <Skeleton height={28} circle visible={loading} />
              </>
            ) : (
              <>
                {currentUser ? (
                  <Menu
                    width={260}
                    position="bottom-end"
                    transitionProps={{ transition: 'pop-top-right' }}
                    onClose={() => setUserMenuOpened(false)}
                    onOpen={() => setUserMenuOpened(true)}
                    withinPortal
                  >
                    <Menu.Target>
                      <UnstyledButton
                        className={cx(classes.user, {
                          [classes.userActive]: userMenuOpened,
                        })}
                      >
                        <Group gap={7}>
                          <Avatar
                            src={currentUser.image}
                            alt={currentUser.nickname || currentUser.name}
                            radius="xl"
                            size={28}
                          />
                          <Text fw={500} size="sm" lh={1} mr={3}>
                            {currentUser.nickname || currentUser.name}
                          </Text>
                          <IconChevronDown
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                          />
                        </Group>
                      </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>Settings</Menu.Label>
                      <Menu.Item
                        component={Link}
                        href={`/users/${currentUser.username}`}
                        leftSection={
                          <IconUser
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                          />
                        }
                      >
                        プロフィール
                      </Menu.Item>
                      <Menu.Item
                        component={Link}
                        href={`/settings`}
                        leftSection={
                          <IconSettings
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                          />
                        }
                      >
                        設定
                      </Menu.Item>
                      <Menu.Item
                        leftSection={
                          <IconLogout
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                          />
                        }
                        onClick={logout}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                ) : (
                  <LoginButton />
                )}
              </>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            {/* <Divider my="sm" />

            {items}
            <Divider my="sm" /> */}

            <Group justify="center" grow pb="xl" px="md">
              {currentUser ? <LogoutButton /> : <LoginButton />}
            </Group>
          </ScrollArea>
        </Drawer>
      </header>
    </>
  )
}
