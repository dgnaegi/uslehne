import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authApi, inviteApi } from '../api/endpoints'
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
  InviteBonus,
  BackBtn,
} from './AuthModal.styled'

type Step = 'email' | 'login' | 'register'

export function AuthModal() {
  const { t } = useTranslation('auth')
  const { login, closeAuthModal } = useAuth()
  const [urlParams] = useSearchParams()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [inviteCode, setInviteCode] = useState(urlParams.get('invite') ?? '')
  const [inviteKudos, setInviteKudos] = useState<number | null>(null)
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const publicSignup = import.meta.env.VITE_PUBLIC_SIGNUP === 'true'

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeAuthModal()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [closeAuthModal])

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
      if (!exists && inviteCode) {
        const { kudos } = await inviteApi.check(inviteCode)
        setInviteKudos(kudos)
      }
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
          autoComplete={step === 'login' ? 'current-password' : 'new-password'}
        />
        <EyeBtn
          type="button"
          onClick={() => setShowPw((p) => !p)}
          aria-label={showPw ? t('hidePassword') : t('showPassword')}
        >
          {showPw ? '🙈' : '👁️'}
        </EyeBtn>
      </PasswordWrapper>
    </FormGroup>
  )

  return (
    <Overlay onClick={closeAuthModal}>
      <ModalBox
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseBtn onClick={closeAuthModal} aria-label="Schliessen">
          ✕
        </CloseBtn>

        {step === 'email' && (
          <>
            <ModalTitle id="auth-modal-title">Anmelden / Registrieren</ModalTitle>
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
              <Button type="submit" disabled={loading}>
                {t('continueButton')}
              </Button>
            </form>
          </>
        )}

        {step === 'login' && (
          <>
            <ModalTitle id="auth-modal-title">{t('loginStep')}</ModalTitle>
            <EmailDisplay>{email}</EmailDisplay>
            <form onSubmit={handleLogin}>
              {pwField}
              {error && <ErrorMsg>{error}</ErrorMsg>}
              <Button type="submit" disabled={loading}>
                {t('loginButton')}
              </Button>
            </form>
            <BackBtn onClick={goBack}>{t('backButton')}</BackBtn>
          </>
        )}

        {step === 'register' && (
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
              {inviteKudos !== null && (
                <InviteBonus>{t('inviteBonus', { kudos: inviteKudos })}</InviteBonus>
              )}
              {error && <ErrorMsg>{error}</ErrorMsg>}
              <Button type="submit" disabled={loading}>
                {t('registerButton')}
              </Button>
            </form>
            <BackBtn onClick={goBack}>{t('backButton')}</BackBtn>
          </>
        )}
      </ModalBox>
    </Overlay>
  )
}
