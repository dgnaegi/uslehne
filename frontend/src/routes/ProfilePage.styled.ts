import styled from 'styled-components'

export const ProfileCard = styled.div`
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radiusLg};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadow};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

export const ProfileRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.sm} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.95rem;

  &:last-child {
    border-bottom: none;
  }
`

export const LedgerTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const LedgerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const LedgerItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.9rem;
  font-weight: 600;
`

export const Delta = styled.span<{ $positive: boolean }>`
  font-weight: 800;
  color: ${({ $positive }) => ($positive ? '#009933' : '#cc0000')};
  min-width: 48px;
`
