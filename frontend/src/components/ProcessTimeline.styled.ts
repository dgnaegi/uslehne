import styled, { keyframes, css } from 'styled-components'

const activePulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(255, 214, 0, 0.7); }
  70%  { box-shadow: 0 0 0 8px rgba(255, 214, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 214, 0, 0); }
`

type StepState = 'done' | 'active' | 'future'

const DOT = '32px'

export const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.spacing.sm} 0;
`

export const StepRow = styled.div`
  display: grid;
  grid-template-columns: ${DOT} 1fr;
  gap: 0 ${({ theme }) => theme.spacing.sm};
`

export const StepLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StepDot = styled.div<{ $state: StepState }>`
  width: ${DOT};
  height: ${DOT};
  flex-shrink: 0;
  border: 2px solid
    ${({ theme, $state }) => ($state === 'future' ? theme.colors.border : theme.colors.primary)};
  background: ${({ theme, $state }) =>
    $state === 'done'
      ? theme.colors.primary
      : $state === 'active'
        ? theme.colors.accent
        : theme.colors.muted};
  color: ${({ theme, $state }) =>
    $state === 'done'
      ? theme.colors.accent
      : $state === 'active'
        ? theme.colors.primary
        : theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ $state }) =>
    $state === 'active' ? css`${activePulse} 2s ease-out infinite` : 'none'};
`

export const StepLine = styled.div<{ $done: boolean }>`
  width: 2px;
  flex: 1;
  min-height: 12px;
  background: ${({ theme, $done }) => ($done ? theme.colors.primary : theme.colors.border)};
  opacity: ${({ $done }) => ($done ? 1 : 0.3)};
`

export const StepBody = styled.div<{ $compact?: boolean }>`
  padding-top: 5px;
  padding-bottom: ${({ theme, $compact }) => ($compact ? theme.spacing.xs : theme.spacing.md)};
`

export const StepTitle = styled.p<{ $state: StepState; $compact?: boolean }>`
  font-size: ${({ $compact }) => ($compact ? '0.68rem' : '0.78rem')};
  font-weight: 800;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  line-height: 1.2;
  color: ${({ theme, $state }) =>
    $state === 'future' ? theme.colors.textMuted : theme.colors.primary};
`

export const StepDesc = styled.p`
  font-size: 0.78rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.01em;
  margin-top: ${({ theme }) => theme.spacing.xs};
  line-height: 1.4;
`
