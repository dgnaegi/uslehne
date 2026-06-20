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

export const NavLinks = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  align-items: center;

  a:hover {
    text-decoration: underline;
    text-underline-offset: ${({ theme }) => theme.spacing.xs};
  }

  a:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius};
  }
`

export const KudoBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  font-size: 0.8rem;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.radius};
  letter-spacing: 0.04em;
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
  &:hover {
    text-decoration: underline;
    text-underline-offset: ${({ theme }) => theme.spacing.xs};
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius};
  }
`
