import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormGroup, Label, Input } from './Layout.styled'
import { IconEye, IconEyeOff } from '../icons'
import { PasswordWrapper, EyeBtn } from './PasswordField.styled'

interface PasswordFieldProps {
  value: string
  onChange: (value: string) => void
  autoComplete: 'current-password' | 'new-password'
}

export function PasswordField({ value, onChange, autoComplete }: PasswordFieldProps) {
  const { t } = useTranslation('auth')
  const [show, setShow] = useState(false)

  return (
    <FormGroup>
      <Label>{t('password')}</Label>
      <PasswordWrapper>
        <Input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          autoComplete={autoComplete}
        />
        <EyeBtn
          type="button"
          onClick={() => setShow((p) => !p)}
          aria-label={show ? t('hidePassword') : t('showPassword')}
        >
          {show ? <IconEyeOff size={16} /> : <IconEye size={16} />}
        </EyeBtn>
      </PasswordWrapper>
    </FormGroup>
  )
}
