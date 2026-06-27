import styled from 'styled-components'

export const Nav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 56px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: rgba(253, 250, 240, 0.55);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
`

export const LogoGroup = styled.div`
  display: none;

  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    gap: 1px;
    flex-shrink: 0;
  }
`

export const Logo = styled.span`
  font-family: ${({ theme }) => theme.fontComic};
  font-size: 1.35rem;
  letter-spacing: 0.06em;
  text-transform: lowercase;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  opacity: 0.55;
`

export const LogoClaim = styled.span`
  display: none;
`

export const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

export const SearchInput = styled.input`
  width: 100%;
  height: 34px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border: 2px solid rgba(26, 26, 26, 0.18);
  border-radius: 999px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.45);
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition:
    border-color 0.15s,
    background 0.15s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: rgba(26, 26, 26, 0.45);
    background: rgba(255, 255, 255, 0.75);
  }
`

export const DesktopNav = styled.nav`
  display: none;

  @media (min-width: 600px) {
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
    align-items: center;
    flex-shrink: 0;
  }
`

export const NavLink = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`

export const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
  font-weight: 700;
  font-size: 0.7rem;
  padding: ${({ theme }) => `2px ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.radius};
`

export const KontoWrapper = styled.div`
  position: relative;
`

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowMd};
  min-width: 180px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  a,
  button {
    display: block;
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    letter-spacing: 0.03em;

    &:hover {
      background: ${({ theme }) => theme.colors.accent};
    }

    & + * {
      border-top: ${({ theme }) => theme.border};
    }
  }
`

export const GuestAuthBtn = styled.button`
  background: none;
  border: none;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0;
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.02em;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`

export const HamburgerBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  padding: ${({ theme }) => theme.spacing.xs};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 600px) {
    display: none;
  }
`

export const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: calc(100dvh - 56px);
  background: ${({ theme }) => theme.colors.surface};
  z-index: 99;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  a,
  button {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    background: none;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
    width: 100%;
    text-align: left;
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: ${({ theme }) => theme.colors.accent};
    }
  }
`
