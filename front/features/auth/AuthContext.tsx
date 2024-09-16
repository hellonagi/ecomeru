'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { DiscordUser, User } from './user.interface'
import { validateToken } from './actions/validate-token'
import { deleteToken } from './actions/delete-token'

interface AuthContextValue {
  loading: boolean
  currentUser: User | null
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [openAuthWindow, setOpenAuthWindow] = useState<Window | null>(null)
  const router = useRouter()
  const baseUrl =
    process.env.NODE_ENV == 'production'
      ? process.env.BASE_URL_PRO
      : process.env.BASE_URL_DEV

  useEffect(() => {
    const accessToken = Cookies.get('access-token')
    const client = Cookies.get('client')
    const uid = Cookies.get('uid')

    if (accessToken && client && uid) {
      const validate = async () => {
        try {
          const response = await validateToken(accessToken, client, uid)
          if (response.success) {
            setCurrentUser(response.user)
          } else {
            setCurrentUser(null)
          }
        } catch (error) {
          setCurrentUser(null)
        } finally {
          setLoading(false)
        }
      }

      validate()
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (process.env.NODE_ENV == 'production') {
        if (event.origin !== baseUrl) return
      } else {
        if (`${event.origin}:80` !== baseUrl) return
      }
      console.log('a')

      const data = event.data as DiscordUser

      clearInterval(timer)

      if (data) {
        const user = {
          uid: data.uid,
          name: data.name,
          username: data.username,
          nickname: data.nickname,
          image: data.image,
        }

        const { auth_token, client_id, uid, expiry } = data
        if (auth_token && client_id && uid) {
          Cookies.set('access-token', auth_token)
          Cookies.set('uid', uid)
          Cookies.set('client', client_id)
          Cookies.set('expiry', expiry.toString())
          setCurrentUser(user)
          if (!data.username) {
            router.push('/auth/init')
          }
        }
      }
    }

    window.addEventListener('message', handleMessage)

    const timer = setInterval(() => {
      openAuthWindow?.postMessage(
        'requestCredentials',
        `${baseUrl}/api/v1/auth/discord/callback`,
      )
    }, 500)

    return () => {
      window.removeEventListener('message', handleMessage)
      clearInterval(timer)
    }
  }, [openAuthWindow])

  const login = () => {
    const windowName = 'DiscordLogin'
    const popup = window.open('', windowName)
    const authForm = document.createElement('form')
    authForm.setAttribute('method', 'post')
    authForm.setAttribute(
      'action',
      `${baseUrl}/api/v1/auth/discord?omniauth_window_type=newWindow`,
    )
    authForm.setAttribute('target', windowName)

    popup?.document.body.appendChild(authForm)
    authForm.submit()
    setOpenAuthWindow(popup)
    popup?.document.body.removeChild(authForm)
  }

  const logout = () => {
    deleteToken()
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ loading, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
