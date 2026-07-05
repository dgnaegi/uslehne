import styled from 'styled-components'

export const Row = styled.div`
  display: inline-flex;
  gap: 2px;
  align-items: center;
`

export const Star = styled.button<{ $filled: boolean; $interactive: boolean }>`
  background: none;
  border: none;
  padding: 0;
  font-size: 1.3rem;
  line-height: 1;
  color: ${({ $filled, theme }) => ($filled ? theme.colors.accent : theme.colors.border)};
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  transition:
    color 0.1s,
    transform 0.1s;
  -webkit-text-stroke: ${({ theme }) => `1.5px ${theme.colors.primary}`};

  &:hover {
    transform: ${({ $interactive }) => ($interactive ? 'scale(1.2)' : 'none')};
  }
`

export const Count = styled.span`
  font-size: 0.82rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-left: ${({ theme }) => theme.spacing.xs};
`
