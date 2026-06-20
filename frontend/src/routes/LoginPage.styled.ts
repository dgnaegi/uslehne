import styled from 'styled-components'

export const FormCard = styled.main`
  max-width: 440px;
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radiusLg};
  box-shadow: ${({ theme }) => theme.shadowMd};
`

export const FormTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const FormFooter = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-size: 0.9rem;

  a {
    font-weight: 700;
    text-decoration: underline;
  }
`
