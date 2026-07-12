import styled from 'styled-components'

export const Lead = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  max-width: 640px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

export const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 640px;
`

export const SectionTitle = styled.h2`
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const P = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const KarmaList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${({ theme }) => theme.spacing.sm} 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

export const KarmaRow = styled.li<{ $positive?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};

  &:last-child {
    border-bottom: none;
  }

  span:last-child {
    font-weight: 700;
    color: ${({ $positive, theme }) => ($positive ? theme.colors.success : theme.colors.error)};
  }
`

export const Tag = styled.span`
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 2px ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.primary};
  margin-right: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`
