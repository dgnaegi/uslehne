import styled from 'styled-components'
import { media } from '../theme'

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

export const Username = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;

  &::before {
    content: '@';
    opacity: 0.45;
    font-size: 1.3rem;
  }
`

export const JoinDate = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
`

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  ${media.sm} {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const StatCard = styled.div`
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const StatLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${({ theme }) => theme.colors.textMuted};
`

export const StatValue = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
`

export const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`

export const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const HistoryItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.88rem;
  font-weight: 600;
`

export const HistoryDelta = styled.span<{ $positive: boolean }>`
  font-weight: 800;
  font-size: 1rem;
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.success : theme.colors.danger};
  flex-shrink: 0;
`

export const HistoryReason = styled.span`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
`

export const HistoryDate = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  flex-shrink: 0;
`

export const EmptyNote = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  font-style: italic;
`
