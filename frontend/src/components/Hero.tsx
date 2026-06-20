import { useTranslation } from 'react-i18next'
import { HeroSection, Tagline } from './Hero.styled'

export function Hero() {
  const { t } = useTranslation('common')
  return (
    <HeroSection>
      <Tagline>{t('tagline')}</Tagline>
    </HeroSection>
  )
}
