import styled from 'styled-components'

export const Section = styled.section`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
`

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

export const FilterButton = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.accent : theme.colors.border};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.accent : theme.colors.surface};
  color: ${({ theme, $active }) =>
    $active ? '#fff' : theme.colors.text};
  border-radius: 999px;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme, $active }) => ($active ? '#fff' : theme.colors.accent)};
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

export const Empty = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
`
