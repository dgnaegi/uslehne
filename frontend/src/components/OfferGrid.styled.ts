import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

export const Empty = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`
