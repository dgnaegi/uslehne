import styled from 'styled-components'

export const HintWrapper = styled.div<{ $dragOver?: boolean; $clickable?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1.5px dashed
    ${({ theme, $dragOver }) => ($dragOver ? theme.colors.accent : theme.colors.border)};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme, $dragOver }) =>
    $dragOver ? theme.colors.pastelYellow : theme.colors.muted};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition:
    background 0.15s,
    border-color 0.15s;
`

export const HintFrames = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`

export const HintLabel = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin: 0;
`
