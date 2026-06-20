import styled from 'styled-components'

export const FormCard = styled.main`
  max-width: 440px;
  margin: ${({ theme }) => theme.spacing.xl} auto;
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

export const InviteNote = styled.p<{ $valid: boolean | null }>`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: 600;
  font-size: 0.9rem;
  background: ${({ $valid }) =>
    $valid === true ? '#d4f0d4' : $valid === false ? '#ffd4d4' : '#f0f0f0'};
`

export const SectionHeading = styled.p`
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`
