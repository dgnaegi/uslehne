import styled from 'styled-components'

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const InviteCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadow};
  gap: ${({ theme }) => theme.spacing.md};
`

export const InviteCode = styled.p`
  font-size: 0.8rem;
  font-family: monospace;
  word-break: break-all;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const InviteStatus = styled.p<{ $used: boolean }>`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme, $used }) => ($used ? theme.colors.textMuted : theme.colors.primary)};
`

export const InviteActions = styled.div`
  flex-shrink: 0;
`
