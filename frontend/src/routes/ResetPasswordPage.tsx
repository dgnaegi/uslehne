import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { authApi } from '../api/endpoints'
import {
  PageWrapper,
  PageTitle,
  FormGroup,
  Label,
  Input,
  Button,
  ErrorMsg,
} from '../components/Layout.styled'
import { FormWrapper, SuccessBox, SuccessLink } from './ResetPasswordPage.styled'

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authApi.resetPassword(token, password)
      setDone(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Zurücksetzen fehlgeschlagen. Fordere einen neuen Link an.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <PageWrapper>
        <PageTitle>Ungültiger Link</PageTitle>
        <ErrorMsg>Ungültiger Link. Fordere einen neuen an.</ErrorMsg>
      </PageWrapper>
    )
  }

  if (done) {
    return (
      <PageWrapper>
        <PageTitle>Passwort zurückgesetzt</PageTitle>
        <SuccessBox>
          Passwort geändert.{' '}
          <SuccessLink to="/offers">Jetzt anmelden →</SuccessLink>
        </SuccessBox>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <PageTitle>Neues Passwort setzen</PageTitle>
      <FormWrapper onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Neues Passwort</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoFocus
            autoComplete="new-password"
          />
        </FormGroup>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Wird gespeichert…' : 'Passwort ändern'}
        </Button>
      </FormWrapper>
    </PageWrapper>
  )
}
