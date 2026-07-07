import styled from 'styled-components'

export const TabBar = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border: ${({ theme }) => theme.border};
  width: fit-content;
`

export const Tab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border: none;
  border-right: ${({ theme }) => theme.border};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.text)};
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background 0.1s ease-out,
    color 0.1s ease-out;

  &:last-child {
    border-right: none;
  }

  &:hover:not(:disabled) {
    background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.accent)};
    color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.primary)};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`
