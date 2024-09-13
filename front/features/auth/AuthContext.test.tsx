import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import Cookies from 'js-cookie'
import { AuthProvider, useAuth } from './AuthContext'
import { validateToken } from './actions/validate-token'
import { deleteToken } from './actions/delete-token'

jest.mock('js-cookie')
jest.mock('./actions/validate-token')
jest.mock('./actions/delete-token')
jest.spyOn(window, 'open').mockImplementation(
  () =>
    ({
      postMessage: jest.fn(),
      closed: false,
      document: {
        body: {
          appendChild: jest.fn(),
          removeChild: jest.fn(),
        },
      },
    }) as unknown as Window,
)

describe('AuthProvider', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('should initially set isAuthenticated to false and currentUser to null', () => {
    const TestComponent = () => {
      const { currentUser } = useAuth()
      return (
        <div>
          <p>Current User: {currentUser?.name || 'None'}</p>
        </div>
      )
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    expect(screen.getByText('Current User: None')).toBeInTheDocument()
  })

  it('should validate token on mount and update authentication state', async () => {
    ;(Cookies.get as jest.Mock).mockImplementation((key: string) => {
      if (key === 'access-token') return 'mock_access_token'
      if (key === 'client') return 'mock_client'
      if (key === 'uid') return 'mock_uid'
      return null
    })
    ;(validateToken as jest.Mock).mockResolvedValue({
      success: true,
      user: { name: 'Test User' },
    })

    const TestComponent = () => {
      const { currentUser } = useAuth()
      return (
        <div>
          <p>Current User: {currentUser?.name || 'None'}</p>
        </div>
      )
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(validateToken).toHaveBeenCalledWith(
        'mock_access_token',
        'mock_client',
        'mock_uid',
      )
      expect(screen.getByText('Current User: Test User')).toBeInTheDocument()
    })
  })

  it('should handle login', async () => {
    // form.submitをモック
    HTMLFormElement.prototype.submit = jest.fn()

    const TestComponent = () => {
      const { login, currentUser } = useAuth()
      return (
        <div>
          <button onClick={login}>Login</button>
          <p>Current User: {currentUser?.name || 'None'}</p>
        </div>
      )
    }

    render(
      <AuthProvider key="new">
        <TestComponent />
      </AuthProvider>,
    )

    const mockUser = {
      uid: '123',
      name: 'Test User',
      nickname: 'Tester',
      image: 'test-image-url',
      auth_token: 'test-token',
      client_id: 'test-client-id',
      expiry: Date.now() + 10000,
    }

    const loginButton = screen.getByText('Login')
    await act(async () => {
      fireEvent.click(loginButton)

      // postMessageを送信してログイン成功をシミュレート
      const messageEvent = new MessageEvent('message', {
        origin: 'http://localhost:3000',
        data: mockUser,
      })

      window.dispatchEvent(messageEvent)
    })

    // クッキーがセットされていることを確認
    expect(Cookies.set).toHaveBeenCalledWith(
      'access-token',
      mockUser.auth_token,
    )
    expect(Cookies.set).toHaveBeenCalledWith('uid', mockUser.uid)
    expect(Cookies.set).toHaveBeenCalledWith('client', mockUser.client_id)
    expect(Cookies.set).toHaveBeenCalledWith(
      'expiry',
      mockUser.expiry.toString(),
    )

    await waitFor(() => {
      // 認証状態とユーザーが正しく更新されたことを確認
      expect(screen.getByText('Current User: Test User')).toBeInTheDocument()
    })
  })

  it('should handle logout', async () => {
    ;(Cookies.get as jest.Mock).mockImplementation((key: string) => {
      if (key === 'access-token') return 'mock_access_token'
      if (key === 'client') return 'mock_client'
      if (key === 'uid') return 'mock_uid'
      return null
    })
    ;(validateToken as jest.Mock).mockResolvedValue({
      success: true,
      user: { name: 'Test User' },
    })

    const TestComponent = () => {
      const { currentUser, logout } = useAuth()
      return (
        <div>
          <p>Current User: {currentUser?.name || 'None'}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    // 初期状態ではログイン済み
    await waitFor(() => {
      expect(screen.getByText('Current User: Test User')).toBeInTheDocument()
    })

    const logoutButton = screen.getByText('Logout')
    fireEvent.click(logoutButton)

    await waitFor(() => {
      expect(deleteToken).toHaveBeenCalled()
      expect(screen.getByText('Current User: None')).toBeInTheDocument()
    })
  })

  it('should set loading to false after validation', async () => {
    ;(Cookies.get as jest.Mock).mockImplementation((key: string) => {
      if (key === 'access-token') return 'mock_access_token'
      if (key === 'client') return 'mock_client'
      if (key === 'uid') return 'mock_uid'
      return null
    })
    ;(validateToken as jest.Mock).mockResolvedValue({
      success: true,
      user: { name: 'Test User' },
    })

    const TestComponent = () => {
      const { loading } = useAuth()
      return (
        <div>
          <p>Loading: {loading ? 'true' : 'false'}</p>
        </div>
      )
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    await waitFor(() => {
      expect(screen.getByText('Loading: false')).toBeInTheDocument()
    })
  })
})
