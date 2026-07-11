import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authApi, inviteApi } from '../api/endpoints'
import { apiMsg } from '../api/client'
import { useAuth } from '../auth/AuthContext'
import { FormGroup, Label, Input, Button, ErrorMsg } from './Layout.styled'
import { IconX } from '../icons'
import { AuthLoginStep } from './AuthLoginStep'
import { AuthRegisterStep } from './AuthRegisterStep'
import { Overlay, ModalBox, ModalTitle, CloseBtn } from './AuthModal.styled'

type Step = 'email' | 'login' | 'register'

export function AuthModal() {
  const { t } = useTranslation('auth')
  const { closeAuthModal } = useAuth()
  const [urlParams] = useSearchParams()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const inviteCode = urlParams.get('invite') ?? ''
  const [inviteKarma, setInviteKarma] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeAuthModal()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [closeAuthModal])

  function goBack() {
    setStep('email')
    setError('')
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { exists } = await authApi.checkEmail(email)
      if (!exists && inviteCode) {
        const { karma } = await inviteApi.check(inviteCode)
        setInviteKarma(karma)
      }
      setStep(exists ? 'login' : 'register')
    } catch (err) {
      setError(apiMsg(err, 'E-Mail-Adresse konnte nicht geprüft werden. Bitte Seite neu laden.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Overlay onClick={closeAuthModal}>
      <ModalBox
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseBtn onClick={closeAuthModal} aria-label="Schliessen">
          <IconX size={16} />
        </CloseBtn>

        {step === 'email' && (
          <>
            <ModalTitle id="auth-modal-title">{t('emailStep')}</ModalTitle>
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

        {step === 'login' && <AuthLoginStep email={email} onBack={goBack} />}

        {step === 'register' && (
          <AuthRegisterStep
            email={email}
            initialInviteCode={inviteCode}
            inviteKarma={inviteKarma}
            onBack={goBack}
          />
        )}
      </ModalBox>
    </Overlay>
  )
}
