import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Footer = styled.footer`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  border-top: 1px solid ${({ theme }) => theme.colors.muted};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};

  a {
    color: ${({ theme }) => theme.colors.textMuted};
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`

export function AppFooter() {
  return (
    <Footer>
      © {new Date().getFullYear()} uslehne.ch &nbsp;·&nbsp;{' '}
      <Link to="/datenschutz">Datenschutz</Link>
      &nbsp;·&nbsp;
      <Link to="/impressum">Impressum</Link>
    </Footer>
  )
}
