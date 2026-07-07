import styled from 'styled-components'
import { media } from '../theme'

export const Nav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  height: ${({ theme }) => theme.headerHeight};
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background};
  border-bottom: ${({ theme }) => theme.border};
`

export const LogoGroup = styled.div`
  display: none;

  ${media.sm} {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex-shrink: 0;
  }
`

export const Logo = styled.span`
  font-family: ${({ theme }) => theme.font};
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
`

export const LogoClaim = styled.span`
  display: none;
`

export const BackHome = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  white-space: nowrap;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`

export const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

export const SearchInput = styled.input`
  width: 100%;
  height: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.sm};
  border: none;
  border-bottom: 2px solid rgba(26, 26, 26, 0.2);
  font-size: 1rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition: border-color 0.12s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }
`

export const DesktopNav = styled.nav`
  display: none;

  ${media.sm} {
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
    align-items: center;
    flex-shrink: 0;
  }
`

export const NavLink = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  transition: color 0.12s;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`

export const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`

export const KudoBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 800;
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px ${({ theme }) => theme.spacing.sm};
`

export const KontoWrapper = styled.div`
  position: relative;
`

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.sm});
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadowMd};
  min-width: 180px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  a,
  button {
    display: block;
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: 0.82rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition:
      background 0.1s,
      color 0.1s;

    &:hover {
      background: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.primary};
    }

    & + * {
      border-top: ${({ theme }) => theme.border};
    }
  }
`

export const GuestAuthBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border: ${({ theme }) => theme.border};
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition:
    background 0.1s,
    color 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const HamburgerWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  ${media.sm} {
    display: none;
  }
`

export const NotifDot = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  pointer-events: none;
`

export const NavLinkWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;

  ${NotifDot} {
    position: absolute;
    top: -4px;
    right: -10px;
  }
`

export const HamburgerBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: calc(100dvh - ${({ theme }) => theme.headerHeight});
  background: ${({ theme }) => theme.colors.surface};
  border-top: ${({ theme }) => theme.border};
  z-index: ${({ theme }) => theme.zIndex.mobileMenu};
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  ${NotifDot} {
    position: static;
    margin-left: auto;
    flex-shrink: 0;
  }

  a,
  button {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
    font-size: 1rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    background: none;
    border: none;
    border-bottom: ${({ theme }) => theme.border};
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition:
      background 0.1s,
      color 0.1s;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: ${({ theme }) => theme.colors.accent};
    }
  }
`
