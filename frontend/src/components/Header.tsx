import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../auth/AuthContext'
import { Nav, Logo, NavLinks, KudoBadge, NavButton } from './Header.styled'

export function Header() {
  const { user, logout, openAuthModal } = useAuth()
  const { t } = useTranslation('common')
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/offers')
  }

  return (
    <Nav>
      <Logo as={Link} to="/offers">
        us<span>lehne</span>
      </Logo>
      <NavLinks>
        <Link to="/offers">{t('nav.offers')}</Link>
        {user ? (
          <>
            <Link to="/my-offers">{t('nav.myOffers')}</Link>
            <Link to="/transactions">{t('nav.transactions')}</Link>
            <Link to="/invites">{t('nav.invites')}</Link>
            <Link to="/profile">
              <KudoBadge>
                {user.kudosBalance} {t('currencyPlural')}
              </KudoBadge>
            </Link>
            <NavButton onClick={handleLogout}>{t('nav.logout')}</NavButton>
          </>
        ) : (
          <NavButton onClick={openAuthModal}>{t('nav.login')}</NavButton>
        )}
      </NavLinks>
    </Nav>
  )
}
