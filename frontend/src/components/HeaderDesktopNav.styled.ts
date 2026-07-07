import styled from 'styled-components'
import { media } from '../theme'
import { NotifDot } from './Header.styled'

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
