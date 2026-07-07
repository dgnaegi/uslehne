import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { authApi } from '../api/endpoints'
import { apiMsg } from '../api/client'
import { useAuth } from '../auth/AuthContext'
import { FormGroup, Label, Input, Button, ErrorMsg } from './Layout.styled'
import { PasswordField } from './PasswordField'
import { ModalTitle, EmailDisplay, InviteBonus, BackBtn } from './AuthModal.styled'

interface AuthRegisterStepProps {
  email: string
  initialInviteCode: string
  inviteKudos: number | null
  onBack: () => void
}

export function AuthRegisterStep({
  email,
  initialInviteCode,
  inviteKudos,
  onBack,
}: AuthRegisterStepProps) {
  const { t } = useTranslation('auth')
  const { login, closeAuthModal } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [inviteCode, setInviteCode] = useState(initialInviteCode)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const publicSignup = import.meta.env.VITE_PUBLIC_SIGNUP === 'true'

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token, user } = await authApi.register({ email, username, password, inviteCode })
      login(token, user)
      closeAuthModal()
    } catch (err) {
      setError(apiMsg(err, 'Registrierung fehlgeschlagen. Bitte Einladungscode prüfen.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ModalTitle id="auth-modal-title">{t('registerStep')}</ModalTitle>
      <EmailDisplay>{email}</EmailDisplay>
      <form onSubmit={handleRegister}>
        <FormGroup>
          <Label>{t('username')}</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={3}
            maxLength={30}
            autoFocus
            autoComplete="username"
          />
        </FormGroup>
        <PasswordField value={password} onChange={setPassword} autoComplete="new-password" />
        {!publicSignup && (
          <FormGroup>
            <Label>{t('inviteCode')}</Label>
            <Input value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} required />
          </FormGroup>
        )}
        {inviteKudos !== null && <InviteBonus>{t('inviteBonus', { kudos: inviteKudos })}</InviteBonus>}
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button type="submit" disabled={loading}>
          {t('registerButton')}
        </Button>
      </form>
      <BackBtn onClick={onBack}>{t('backButton')}</BackBtn>
    </>
  )
}
