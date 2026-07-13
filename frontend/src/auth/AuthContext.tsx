import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User } from '../api/types'
import { authApi } from '../api/endpoints'

interface AuthContextValue {
  user: User | null
  login: (user: Pick<User, 'id' | 'username' | 'email' | 'karmaBalance'>) => void
  logout: () => void
  refreshUser: () => Promise<void>
  isLoading: boolean
  isAuthModalOpen: boolean
  openAuthModal: () => void
  closeAuthModal: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

// Übergang von localStorage-Token auf httpOnly-Cookie: einen noch
// vorhandenen Token einmalig gegen ein Cookie tauschen.
async function migrateLegacyToken(): Promise<void> {
  const legacyToken = localStorage.getItem('token')
  if (!legacyToken) return
  try {
    await authApi.migrateSession(legacyToken)
    localStorage.removeItem('token')
  } catch (err) {
    // Nur bei 401 ist der Token wirklich ungültig. Bei Netzwerkfehlern oder
    // 5xx (z.B. während eines Deploys) bleibt er für den nächsten Versuch.
    if ((err as { status?: number }).status === 401) {
      localStorage.removeItem('token')
    }
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  useEffect(() => {
    async function init() {
      await migrateLegacyToken()
      try {
        const { user: u } = await authApi.me()
        setUser(u)
      } catch {
        // 401 = nicht eingeloggt, alles andere = vorübergehend nicht erreichbar.
        // In beiden Fällen bleibt das Cookie unangetastet.
      } finally {
        setIsLoading(false)
      }
    }
    void init()
  }, [])

  function login(newUser: Pick<User, 'id' | 'username' | 'email' | 'karmaBalance'>) {
    setUser(newUser as User)
  }

  function logout() {
    void authApi.logout().catch(() => {})
    setUser(null)
  }

  async function refreshUser() {
    if (!user) return
    const { user: u } = await authApi.me()
    setUser(u)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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
