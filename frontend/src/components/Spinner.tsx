import { useTranslation } from 'react-i18next'
import { SpinnerRing } from './Spinner.styled'

interface SpinnerProps {
  size?: number
}

export function Spinner({ size = 32 }: SpinnerProps) {
  const { t } = useTranslation('common')
  return <SpinnerRing $size={size} role="status" aria-label={t('actions.loading')} />
}
