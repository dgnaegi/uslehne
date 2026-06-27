import styled from 'styled-components'

export const TabBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const Tab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.text)};
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

export const TxCard = styled.div`
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadow};
`

export const TxTitle = styled.h3`
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const TxMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`

export const TxContact = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

export const RateRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  font-size: 0.88rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};

  button {
    font-size: 0.82rem;
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  }
`

export const TxActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`
