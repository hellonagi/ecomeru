import { render, fireEvent, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { AuthProvider } from '@/features/auth/AuthContext'
import LogoutButton from './LogoutButton'

const mockLogout = jest.fn()

jest.mock('./AuthContext', () => {
  const originalModule = jest.requireActual('./AuthContext')

  return {
    ...originalModule,
    useAuth: () => ({
      isAuthenticated: false,
      currentUser: null,
      login: jest.fn(),
      logout: mockLogout,
    }),
  }
})

describe('LogoutButton', () => {
  const renderComponent = () =>
    render(
      <MantineProvider>
        <AuthProvider>
          <LogoutButton />
        </AuthProvider>
      </MantineProvider>,
    )

  it('renders the button with "Logout" text', () => {
    renderComponent()
    const logoutButton = screen.getByRole('button', { name: /Logout/i })
    expect(logoutButton).toBeInTheDocument()
  })

  it('calls the logout function when clicked', () => {
    renderComponent()
    const logoutButton = screen.getByRole('button', { name: /Logout/i })
    fireEvent.click(logoutButton)

    expect(mockLogout).toHaveBeenCalledTimes(1)
  })
})
