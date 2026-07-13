import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User } from '../api/types'
import { authApi } from '../api/endpoints'

interface AuthContextValue {
  user: User | null
  token: string | null
  login: (token: string, user: Pick<User, 'id' | 'username' | 'email' | 'karmaBalance'>) => void
  logout: () => void
  refreshUser: () => Promise<void>
  isLoading: boolean
  isAuthModalOpen: boolean
  openAuthModal: () => void
  closeAuthModal: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }
    authApi
      .me()
      .then(({ user: u }) => setUser(u))
      .catch((err: unknown) => {
        // Nur bei 401 ist der Token wirklich ungültig. Netzwerkfehler oder
        // 5xx (z.B. während eines Deploys) dürfen die Session nicht beenden.
        if ((err as { status?: number }).status === 401) {
          localStorage.removeItem('token')
          setToken(null)
        }
      })
      .finally(() => setIsLoading(false))
  }, [token])

  function login(
    newToken: string,
    newUser: Pick<User, 'id' | 'username' | 'email' | 'karmaBalance'>,
  ) {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setUser(newUser as User)
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  async function refreshUser() {
    if (!token) return
    const { user: u } = await authApi.me()
    setUser(u)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        refreshUser,
        isLoading,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
