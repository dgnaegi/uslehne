import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../auth/AuthContext'
import { usePendingRequests } from '../hooks/usePendingRequests'
import { IconInfo } from '../icons'
import { HeaderDesktopNav } from './HeaderDesktopNav'
import { HeaderMobileMenu } from './HeaderMobileMenu'
import {
  Nav,
  LogoGroup,
  Logo,
  LogoClaim,
  BackHome,
  SearchWrapper,
  SearchInput,
  AboutBtn,
  GuestAuthBtn,
} from './Header.styled'

export function Header() {
  const { user, logout, openAuthModal } = useAuth()
  const pendingCount = usePendingRequests()
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const isOnFeed = location.pathname === '/offers'
  const [searchValue, setSearchValue] = useState(() => searchParams.get('q') ?? '')
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

  function handleLogout() {
    logout()
    navigate('/offers')
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

      {isOnFeed && (
        <SearchWrapper>
          <SearchInput
            type="search"
            placeholder="Suchen…"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </SearchWrapper>
      )}

      <AboutBtn as={Link} to="/ueber-uns" aria-label="Über uns">
        <IconInfo size={22} />
      </AboutBtn>

      {user ? (
        <>
          <HeaderDesktopNav user={user} pendingCount={pendingCount} onLogout={handleLogout} />
          <HeaderMobileMenu user={user} pendingCount={pendingCount} onLogout={handleLogout} />
        </>
      ) : (
        <GuestAuthBtn onClick={openAuthModal}>{t('nav.login')}</GuestAuthBtn>
      )}
    </Nav>
  )
}
