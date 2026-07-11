import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { User } from '../api/types'
import { IconShield } from '../icons'
import { NotifDot } from './Header.styled'
import {
  DesktopNav,
  NavLink,
  NavLinkWrapper,
  NavButton,
  KarmaBadge,
  KontoWrapper,
  DropdownMenu,
} from './HeaderDesktopNav.styled'

interface HeaderDesktopNavProps {
  user: User
  pendingCount: number
  onLogout: () => void
}

export function HeaderDesktopNav({ user, pendingCount, onLogout }: HeaderDesktopNavProps) {
  const { t } = useTranslation('common')
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

  return (
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
          <KarmaBadge>{user.karmaBalance} Karma</KarmaBadge>
        </NavButton>
        {kontoOpen && (
          <DropdownMenu>
            <Link to="/invites" onClick={() => setKontoOpen(false)}>
              {t('nav.invites')}
            </Link>
            <Link to="/profile" onClick={() => setKontoOpen(false)}>
              {t('nav.profile')}
            </Link>
            <button onClick={onLogout}>{t('nav.logout')}</button>
          </DropdownMenu>
        )}
      </KontoWrapper>
    </DesktopNav>
  )
}
