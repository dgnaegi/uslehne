import styled from 'styled-components'

export const Nav = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: ${({ theme }) => theme.shadowMd};
`

export const Logo = styled.span`
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: lowercase;

  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`

export const NavLinks = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: 0.9rem;
  opacity: 0.85;

  a:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.accent};
  }
`
