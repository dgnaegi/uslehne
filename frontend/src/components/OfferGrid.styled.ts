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
`

export const Empty = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`
