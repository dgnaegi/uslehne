import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../auth/AuthContext'
import {
  Nav,
  LogoGroup,
  Logo,
  LogoClaim,
  SearchWrapper,
  SearchInput,
  DesktopNav,
  NavLink,
  NavButton,
  KudoBadge,
  KontoWrapper,
  DropdownMenu,
  GuestAuthBtn,
  HamburgerBtn,
  MobileMenu,
} from './Header.styled'

export function Header() {
  const { user, logout, openAuthModal } = useAuth()
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [kontoOpen, setKontoOpen] = useState(false)
  const kontoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (kontoRef.current && !kontoRef.current.contains(e.target as Node)) {
        setKontoOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function handleLogout() {
    logout()
    navigate('/offers')
    setMobileOpen(false)
    setKontoOpen(false)
  }

  return (
    <Nav>
      <LogoGroup>
        <Logo as={Link} to="/offers">
          uslehne
        </Logo>
        <LogoClaim />
      </LogoGroup>

      <SearchWrapper>
        <SearchInput type="search" placeholder="Suchen…" readOnly />
      </SearchWrapper>

      {user ? (
        <>
          <DesktopNav>
            <NavLink as={Link} to="/transactions">
              {t('nav.transactions')}
            </NavLink>
            <NavLink as={Link} to="/my-offers">
              {t('nav.myOffers')}
            </NavLink>
            <KontoWrapper ref={kontoRef}>
              <NavButton onClick={() => setKontoOpen((o) => !o)}>
                {t('nav.account')}
                <KudoBadge>{user.kudosBalance} Kudos</KudoBadge>
              </NavButton>
              {kontoOpen && (
                <DropdownMenu>
                  <Link to="/invites" onClick={() => setKontoOpen(false)}>
                    {t('nav.invites')}
                  </Link>
                  <Link to="/profile" onClick={() => setKontoOpen(false)}>
                    {t('nav.profile')}
                  </Link>
                  <button onClick={handleLogout}>{t('nav.logout')}</button>
                </DropdownMenu>
              )}
            </KontoWrapper>
          </DesktopNav>

          <HamburgerBtn
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menü öffnen"
          >
            {mobileOpen ? '✕' : '☰'}
          </HamburgerBtn>

          {mobileOpen && (
            <MobileMenu>
              <Link to="/transactions" onClick={() => setMobileOpen(false)}>
                🤝 {t('nav.transactions')}
              </Link>
              <Link to="/my-offers" onClick={() => setMobileOpen(false)}>
                📦 {t('nav.myOffers')}
              </Link>
              <Link to="/invites" onClick={() => setMobileOpen(false)}>
                🔗 {t('nav.invites')}
              </Link>
              <Link to="/profile" onClick={() => setMobileOpen(false)}>
                💰 {user.kudosBalance} Kudos
              </Link>
              <button onClick={handleLogout}>🚪 {t('nav.logout')}</button>
            </MobileMenu>
          )}
        </>
      ) : (
        <GuestAuthBtn onClick={openAuthModal}>
          {t('nav.register')} / {t('nav.login')}
        </GuestAuthBtn>
      )}
    </Nav>
  )
}
