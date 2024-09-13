import { Button } from '@mantine/core'
import { useAuth } from '@/features/auth/AuthContext'

export default function LogoutButton() {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Button onClick={handleLogout} variant="default">
      Logout
    </Button>
  )
}
