import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { User } from '../api/types'
import {
  IconX,
  IconMenu,
  IconRepeat,
  IconBox,
  IconLink,
  IconAward,
  IconLogOut,
  IconShield,
  IconInfo,
} from '../icons'
import { NotifDot } from './Header.styled'
import { HamburgerWrapper, HamburgerBtn, MobileMenu } from './HeaderMobileMenu.styled'

interface HeaderMobileMenuProps {
  user: User
  pendingCount: number
  onLogout: () => void
}

export function HeaderMobileMenu({ user, pendingCount, onLogout }: HeaderMobileMenuProps) {
  const { t } = useTranslation('common')
  const [open, setOpen] = useState(false)

  return (
    <>
      <HamburgerWrapper>
        <HamburgerBtn onClick={() => setOpen((o) => !o)} aria-label="Menü öffnen">
          {open ? <IconX size={20} /> : <IconMenu size={20} />}
        </HamburgerBtn>
        {pendingCount > 0 && <NotifDot />}
      </HamburgerWrapper>

      {open && (
        <MobileMenu>
          {user.role === 'ADMIN' && (
            <Link to="/admin" onClick={() => setOpen(false)}>
              <IconShield size={18} /> Admin
            </Link>
          )}
          <Link to="/transactions" onClick={() => setOpen(false)}>
            <IconRepeat size={18} /> {t('nav.transactions')}
            {pendingCount > 0 && <NotifDot />}
          </Link>
          <Link to="/my-offers" onClick={() => setOpen(false)}>
            <IconBox size={18} /> {t('nav.myOffers')}
          </Link>
          <Link to="/invites" onClick={() => setOpen(false)}>
            <IconLink size={18} /> {t('nav.invites')}
          </Link>
          <Link to="/profile" onClick={() => setOpen(false)}>
            <IconAward size={18} /> {user.karmaBalance} Karma
          </Link>
          <Link to="/ueber-uns" onClick={() => setOpen(false)}>
            <IconInfo size={18} /> {t('nav.information')}
          </Link>
          <button onClick={onLogout}>
            <IconLogOut size={18} /> {t('nav.logout')}
          </button>
        </MobileMenu>
      )}
    </>
  )
}
