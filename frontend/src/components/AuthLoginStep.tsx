import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authApi } from '../api/endpoints'
import { apiMsg } from '../api/client'
import { useAuth } from '../auth/AuthContext'
import { Button, ErrorMsg } from './Layout.styled'
import { PasswordField } from './PasswordField'
import { ModalTitle, EmailDisplay, BackBtn, ForgotLink } from './AuthModal.styled'

interface AuthLoginStepProps {
  email: string
  onBack: () => void
}

export function AuthLoginStep({ email, onBack }: AuthLoginStepProps) {
  const { t } = useTranslation('auth')
  const { login, closeAuthModal } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token, user } = await authApi.login({ login: email, password })
      login(token, user)
      closeAuthModal()
    } catch (err) {
      setError(apiMsg(err, 'Anmeldung fehlgeschlagen. Bitte E-Mail und Passwort prüfen.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ModalTitle id="auth-modal-title">{t('loginStep')}</ModalTitle>
      <EmailDisplay>{email}</EmailDisplay>
      <form onSubmit={handleLogin}>
        <PasswordField value={password} onChange={setPassword} autoComplete="current-password" />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button type="submit" disabled={loading}>
          {t('loginButton')}
        </Button>
      </form>
      <ForgotLink
        onClick={() => {
          closeAuthModal()
          navigate('/forgot-password')
        }}
      >
        Passwort vergessen?
      </ForgotLink>
      <BackBtn onClick={onBack}>{t('backButton')}</BackBtn>
    </>
  )
}
