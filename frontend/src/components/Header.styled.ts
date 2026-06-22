import styled from 'styled-components'

export const Nav = styled.header`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${({ theme }) => theme.border};
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 600px) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  }
`

export const Logo = styled.span`
  font-family: ${({ theme }) => theme.fontComic};
  font-size: 2rem;
  letter-spacing: 0.08em;
  text-transform: lowercase;
  line-height: 1;
`

export const DesktopNav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  @media (max-width: 600px) {
    display: none;
  }
`

export const NavLink = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`

export const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  color: inherit;
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
  font-size: 0.75rem;
  padding: ${({ theme }) => `2px ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.radius};
`

export const KontoWrapper = styled.div`
  position: relative;
`

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadowMd};
  min-width: 180px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  a, button {
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

export const HamburgerBtn = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
  color: inherit;
  line-height: 1;
  padding: 0;

  @media (max-width: 600px) {
    display: block;
  }
`

export const MobileMenu = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.surface};
    border-bottom: ${({ theme }) => theme.border};
    box-shadow: ${({ theme }) => theme.shadowMd};
    z-index: 99;

    a, button {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.spacing.sm};
      padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
      font-size: 1rem;
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
  }
`
