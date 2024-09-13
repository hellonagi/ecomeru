import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MantineProvider } from '@mantine/core'
import { AuthProvider } from './AuthContext'
import LoginButton from './LoginButton'

const mockLogin = jest.fn()

jest.mock('./AuthContext', () => {
  const originalModule = jest.requireActual('./AuthContext')

  return {
    ...originalModule,
    useAuth: () => ({
      isAuthenticated: false,
      currentUser: null,
      login: mockLogin,
      logout: jest.fn(),
    }),
  }
})

describe('LoginButton', () => {
  it('calls login function when clicked', async () => {
    render(
      <MantineProvider>
        <AuthProvider>
          <LoginButton />
        </AuthProvider>
      </MantineProvider>,
    )

    const button = screen.getByRole('button', { name: /Login/i })
    await userEvent.click(button)

    expect(mockLogin).toHaveBeenCalledTimes(1)
  })
})
