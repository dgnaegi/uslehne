import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  & > *:nth-child(1) { animation-delay: 0ms; }
  & > *:nth-child(2) { animation-delay: 50ms; }
  & > *:nth-child(3) { animation-delay: 100ms; }
  & > *:nth-child(4) { animation-delay: 150ms; }
  & > *:nth-child(5) { animation-delay: 200ms; }
  & > *:nth-child(6) { animation-delay: 250ms; }
  & > *:nth-child(n + 7) { animation-delay: 300ms; }
`

export const Empty = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`
