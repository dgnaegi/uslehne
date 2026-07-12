import { css } from 'styled-components'

// Shared look for filter-bar controls: flat, 2px border, bold uppercase
export const filterControlCss = css<{ $active: boolean }>`
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : 'none')};
  border: 2px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textMuted)};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.textMuted)};
  white-space: nowrap;
  flex-shrink: 0;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;

  @media (hover: hover) {
    &:hover {
      background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.accent)};
      border-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.text)};
    }
  }
`
