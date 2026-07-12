import styled, { keyframes } from 'styled-components'

const starPop = keyframes`
  0%   { transform: scale(1); }
  40%  { transform: scale(1.35); }
  70%  { transform: scale(1.1); }
  100% { transform: scale(1.2); }
`

export const Row = styled.div`
  display: inline-flex;
  gap: 2px;
  align-items: center;
`

export const Star = styled.button<{ $filled: boolean; $interactive: boolean }>`
  background: none;
  border: none;
  padding: 0;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  color: ${({ $filled, theme }) => ($filled ? theme.colors.accent : theme.colors.border)};
  cursor: ${({ $interactive }) => ($interactive ? 'pointer' : 'default')};
  transition:
    color 0.1s,
    transform 0.1s;

  & svg polygon {
    fill: ${({ $filled }) => ($filled ? 'currentColor' : 'none')};
  }

  &:hover {
    animation: ${({ $interactive }) => ($interactive ? `${starPop} 0.22s ease-out forwards` : 'none')};
  }

  &:active {
    transform: ${({ $interactive }) => ($interactive ? 'scale(0.88)' : 'none')};
  }
`

export const Count = styled.span`
  font-size: 0.82rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-left: ${({ theme }) => theme.spacing.xs};
`
