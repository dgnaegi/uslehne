import { useState } from 'react'
import { authApi } from '../api/endpoints'
import { PageWrapper, PageTitle, Button } from '../components/Layout.styled'
import { FormGroup, Label, Input, ErrorMsg } from '../components/Form.styled'
import { FormWrapper, SuccessBox } from './ForgotPasswordPage.styled'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authApi.forgotPassword(email)
      setSent(true)
    } catch {
      setError('Anfrage fehlgeschlagen. Versuch es noch einmal.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <PageTitle>Passwort vergessen</PageTitle>
      {sent ? (
        <SuccessBox>
          Falls ein Konto mit dieser E-Mail-Adresse existiert, haben wir dir einen Link geschickt.
          Check auch den Spam-Ordner.
        </SuccessBox>
      ) : (
        <FormWrapper onSubmit={handleSubmit}>
          <FormGroup>
            <Label>E-Mail-Adresse</Label>
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
            {loading ? 'Wird gesendet…' : 'Link senden'}
          </Button>
        </FormWrapper>
      )}
    </PageWrapper>
  )
}
