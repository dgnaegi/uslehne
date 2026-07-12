import styled from 'styled-components'

export const Footer = styled.footer`
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