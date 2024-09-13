import { Button } from '@mantine/core'
import { IconBrandDiscord } from '@tabler/icons-react'
import { useAuth } from '@/features/auth/AuthContext'

export default function LoginButton() {
  const { login } = useAuth()

  const handleLogin = () => {
    login()
  }

  return (
    <Button
      onClick={handleLogin}
      leftSection={<IconBrandDiscord size={18} />}
      variant="default"
    >
      Login
    </Button>
  )
}
