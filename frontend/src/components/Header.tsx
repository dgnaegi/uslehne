import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../auth/AuthContext'
import {
  IconX,
  IconMenu,
  IconRepeat,
  IconBox,
  IconLink,
  IconAward,
  IconLogOut,
  IconShield,
} from '../icons'
import { usePendingRequests } from '../hooks/usePendingRequests'
import {
  Nav,
  LogoGroup,
  Logo,
  LogoClaim,
  BackHome,
  SearchWrapper,
  SearchInput,
  DesktopNav,
  NavLink,
  NavLinkWrapper,
  NavButton,
  KudoBadge,
  KontoWrapper,
  DropdownMenu,
  GuestAuthBtn,
  HamburgerWrapper,
  HamburgerBtn,
  NotifDot,
  MobileMenu,
} from './Header.styled'

export function Header() {
  const { user, logout, openAuthModal } = useAuth()
  const pendingCount = usePendingRequests()
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const isOnFeed = location.pathname === '/offers'
  const [mobileOpen, setMobileOpen] = useState(false)
  const [kontoOpen, setKontoOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(() => searchParams.get('q') ?? '')
  const kontoRef = useRef<HTMLDivElement>(null)
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setSearchValue(searchParams.get('q') ?? '')
  }, [searchParams])

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setSearchValue(val)
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current)
    searchTimerRef.current = setTimeout(() => {
      if (isOnFeed) {
        setSearchParams(val.trim() ? { q: val.trim() } : {}, { replace: true })
      } else {
        navigate(val.trim() ? `/offers?q=${encodeURIComponent(val.trim())}` : '/offers')
      }
    }, 300)
  }

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
      {isOnFeed ? (
        <LogoGroup>
          <Logo as={Link} to="/offers">
            uslehne
          </Logo>
          <LogoClaim />
        </LogoGroup>
      ) : (
        <BackHome as={Link} to="/offers">
          ← {t('nav.offers')}
        </BackHome>
      )}

      <SearchWrapper>
        <SearchInput
          type="search"
          placeholder="Suchen…"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </SearchWrapper>

      {user ? (
        <>
          <DesktopNav>
            {user.role === 'ADMIN' && (
              <NavLink as={Link} to="/admin">
                <IconShield size={14} /> Admin
              </NavLink>
            )}
            <NavLinkWrapper>
              <NavLink as={Link} to="/transactions">
                {t('nav.transactions')}
              </NavLink>
              {pendingCount > 0 && <NotifDot />}
            </NavLinkWrapper>
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

          <HamburgerWrapper>
            <HamburgerBtn onClick={() => setMobileOpen((o) => !o)} aria-label="Menü öffnen">
              {mobileOpen ? <IconX size={20} /> : <IconMenu size={20} />}
            </HamburgerBtn>
            {pendingCount > 0 && <NotifDot />}
          </HamburgerWrapper>

          {mobileOpen && (
            <MobileMenu>
              {user.role === 'ADMIN' && (
                <Link to="/admin" onClick={() => setMobileOpen(false)}>
                  <IconShield size={18} /> Admin
                </Link>
              )}
              <Link to="/transactions" onClick={() => setMobileOpen(false)}>
                <IconRepeat size={18} /> {t('nav.transactions')}
                {pendingCount > 0 && <NotifDot />}
              </Link>
              <Link to="/my-offers" onClick={() => setMobileOpen(false)}>
                <IconBox size={18} /> {t('nav.myOffers')}
              </Link>
              <Link to="/invites" onClick={() => setMobileOpen(false)}>
                <IconLink size={18} /> {t('nav.invites')}
              </Link>
              <Link to="/profile" onClick={() => setMobileOpen(false)}>
                <IconAward size={18} /> {user.kudosBalance} Kudos
              </Link>
              <button onClick={handleLogout}>
                <IconLogOut size={18} /> {t('nav.logout')}
              </button>
            </MobileMenu>
          )}
        </>
      ) : (
        <GuestAuthBtn onClick={openAuthModal}>{t('nav.login')}</GuestAuthBtn>
      )}
    </Nav>
  )
}
