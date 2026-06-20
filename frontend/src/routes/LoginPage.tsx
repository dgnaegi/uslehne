import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authApi } from '../api/endpoints'
import { useAuth } from '../auth/AuthContext'
import { FormGroup, Label, Input, Button, ErrorMsg } from '../components/Layout.styled'
import { FormCard, FormTitle, FormFooter } from './LoginPage.styled'

interface FormValues {
  login: string
  password: string
}

export function LoginPage() {
  const { t } = useTranslation(['auth', 'common'])
  const { login } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>()

  async function onSubmit(values: FormValues) {
    try {
      const { token, user } = await authApi.login(values)
      login(token, user)
      navigate(params.get('redirect') ?? '/offers')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t('errors:GENERIC', { ns: 'errors' })
      setError('root', { message: msg })
    }
  }

  return (
    <FormCard>
      <FormTitle>{t('auth:loginTitle')}</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>{t('auth:email')}</Label>
          <Input {...register('login', { required: true })} autoComplete="username" />
          {errors.login && <ErrorMsg>{errors.login.message}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <Label>{t('auth:password')}</Label>
          <Input
            type="password"
            {...register('password', { required: true })}
            autoComplete="current-password"
          />
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        </FormGroup>
        {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
        <Button type="submit" disabled={isSubmitting}>
          {t('auth:loginButton')}
        </Button>
      </form>
      <FormFooter>
        {t('auth:registerPrompt')} <Link to="/register">{t('auth:registerLink')}</Link>
      </FormFooter>
    </FormCard>
  )
}
