import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { authApi } from '../api/endpoints'
import { useAuth } from '../auth/AuthContext'
import { FormGroup, Label, Input, Button, ErrorMsg } from './Layout.styled'
import {
  Overlay,
  ModalBox,
  ModalTitle,
  CloseBtn,
  EmailDisplay,
  PasswordWrapper,
  EyeBtn,
  BackBtn,
} from './AuthModal.styled'

type Step = 'email' | 'login' | 'register'

export function AuthModal() {
  const { t } = useTranslation('auth')
  const { login, closeAuthModal } = useAuth()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const publicSignup = import.meta.env.VITE_PUBLIC_SIGNUP === 'true'

  function goBack() {
    setStep('email')
    setPassword('')
    setError('')
    setShowPw(false)
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { exists } = await authApi.checkEmail(email)
      setStep(exists ? 'login' : 'register')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Prüfen.')
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token, user } = await authApi.login({ login: email, password })
      login(token, user)
      closeAuthModal()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token, user } = await authApi.register({ email, username, password, inviteCode })
      login(token, user)
      closeAuthModal()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler')
    } finally {
      setLoading(false)
    }
  }

  const pwField = (
    <FormGroup>
      <Label>{t('password')}</Label>
      <PasswordWrapper>
        <Input
          type={showPw ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ paddingRight: '2.5rem', width: '100%' }}
          autoComplete={step === 'login' ? 'current-password' : 'new-password'}
        />
        <EyeBtn
          type="button"
          onClick={() => setShowPw((p) => !p)}
          title={showPw ? t('hidePassword') : t('showPassword')}
        >
          {showPw ? '🙈' : '👁️'}
        </EyeBtn>
      </PasswordWrapper>
    </FormGroup>
  )

  return (
    <Overlay onClick={closeAuthModal}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={closeAuthModal} aria-label="Schliessen">✕</CloseBtn>

        {step === 'email' && (
          <>
            <ModalTitle>Anmelden</ModalTitle>
            <form onSubmit={handleEmailSubmit}>
              <FormGroup>
                <Label>{t('email')}</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  autoComplete="email"
                />
              </FormGroup>
              {error && <ErrorMsg>{error}</ErrorMsg>}
              <Button type="submit" disabled={loading}>{t('continueButton')}</Button>
            </form>
          </>
        )}

        {step === 'login' && (
          <>
            <ModalTitle>{t('loginStep')}</ModalTitle>
            <EmailDisplay>{email}</EmailDisplay>
            <form onSubmit={handleLogin}>
              {pwField}
              {error && <ErrorMsg>{error}</ErrorMsg>}
              <Button type="submit" disabled={loading}>{t('loginButton')}</Button>
            </form>
            <BackBtn onClick={goBack}>{t('backButton')}</BackBtn>
          </>
        )}

        {step === 'register' && (
          <>
            <ModalTitle>{t('registerStep')}</ModalTitle>
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
              {pwField}
              {!publicSignup && (
                <FormGroup>
                  <Label>{t('inviteCode')}</Label>
                  <Input
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    required
                  />
                </FormGroup>
              )}
              {error && <ErrorMsg>{error}</ErrorMsg>}
              <Button type="submit" disabled={loading}>{t('registerButton')}</Button>
            </form>
            <BackBtn onClick={goBack}>{t('backButton')}</BackBtn>
          </>
        )}
      </ModalBox>
    </Overlay>
  )
}
