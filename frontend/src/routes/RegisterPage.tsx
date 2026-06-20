import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authApi, inviteApi } from '../api/endpoints'
import { useAuth } from '../auth/AuthContext'
import { FormGroup, Label, Input, Button, ErrorMsg } from '../components/Layout.styled'
import { FormCard, FormTitle, FormFooter, InviteNote, SectionHeading } from './RegisterPage.styled'

interface FormValues {
  username: string
  email: string
  password: string
  street: string
  zip: string
  city: string
  label?: string
}

export function RegisterPage() {
  const { t } = useTranslation(['auth', 'common'])
  const { login } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const inviteCode = params.get('invite') ?? ''
  const [inviteValid, setInviteValid] = useState<boolean | null>(null)
  const publicSignup = import.meta.env.VITE_PUBLIC_SIGNUP !== 'false'
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>()

  useEffect(() => {
    if (!inviteCode) return
    inviteApi
      .check(inviteCode)
      .then(({ valid }) => setInviteValid(valid))
      .catch(() => setInviteValid(false))
  }, [inviteCode])

  const canRegister = publicSignup || inviteValid === true

  async function onSubmit(values: FormValues) {
    try {
      const { token, user } = await authApi.register({
        username: values.username,
        email: values.email,
        password: values.password,
        inviteCode,
        address: { street: values.street, zip: values.zip, city: values.city, label: values.label },
      })
      login(token, user)
      navigate('/offers')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t('errors:GENERIC', { ns: 'errors' })
      setError('root', { message: msg })
    }
  }

  if (!publicSignup && !inviteCode) {
    return (
      <FormCard>
        <FormTitle>{t('auth:registerTitle')}</FormTitle>
        <p>{t('auth:inviteOnly')}</p>
      </FormCard>
    )
  }

  return (
    <FormCard>
      <FormTitle>{t('auth:registerTitle')}</FormTitle>
      {inviteCode && (
        <InviteNote $valid={inviteValid}>
          {inviteValid === null
            ? t('auth:inviteChecking')
            : inviteValid
              ? t('auth:inviteValid')
              : t('auth:inviteInvalid')}
        </InviteNote>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>{t('auth:username')}</Label>
          <Input {...register('username', { required: true })} />
        </FormGroup>
        <FormGroup>
          <Label>{t('auth:email')}</Label>
          <Input type="email" {...register('email', { required: true })} />
        </FormGroup>
        <FormGroup>
          <Label>{t('auth:password')}</Label>
          <Input type="password" {...register('password', { required: true, minLength: 8 })} />
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        </FormGroup>
        <SectionHeading>{t('auth:addressSection')}</SectionHeading>
        <FormGroup>
          <Label>{t('auth:street')}</Label>
          <Input {...register('street', { required: true })} />
        </FormGroup>
        <FormGroup>
          <Label>{t('auth:zip')}</Label>
          <Input {...register('zip', { required: true })} />
        </FormGroup>
        <FormGroup>
          <Label>{t('auth:city')}</Label>
          <Input {...register('city', { required: true })} />
        </FormGroup>
        <FormGroup>
          <Label>{t('auth:addressLabel')}</Label>
          <Input {...register('label')} />
        </FormGroup>
        {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
        <Button type="submit" disabled={isSubmitting || !canRegister}>
          {t('auth:registerButton')}
        </Button>
      </form>
      <FormFooter>
        {t('auth:loginPrompt')} <Link to="/login">{t('auth:loginLink')}</Link>
      </FormFooter>
    </FormCard>
  )
}
