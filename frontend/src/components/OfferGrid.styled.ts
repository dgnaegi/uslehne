import styled from 'styled-components'

export const Section = styled.section`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
`

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontComic};
  font-size: 2rem;
  letter-spacing: 0.06em;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

export const FilterButton = styled.button<{ $active: boolean }>`
  border: ${({ theme }) => theme.border};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.accent : theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  box-shadow: ${({ theme, $active }) => ($active ? theme.shadow : 'none')};
  transition: all 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.shadow};
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

export const Empty = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
`
