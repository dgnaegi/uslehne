import { useAuth } from '../auth/AuthContext'
import { AuthPrompt, Button } from './Layout.styled'

interface Props {
  children: React.ReactNode
}

export function PrivateRoute({ children }: Props) {
  const { user, isLoading, openAuthModal } = useAuth()
  if (isLoading) return null
  if (!user) {
    return (
      <AuthPrompt>
        <p>Bitte melde dich an.</p>
        <Button onClick={openAuthModal}>Anmelden</Button>
      </AuthPrompt>
    )
  }
  return <>{children}</>
}
