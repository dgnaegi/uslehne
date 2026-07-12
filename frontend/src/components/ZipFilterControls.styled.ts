import styled, { css } from 'styled-components'

export const TypeFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-left: auto;
  flex-shrink: 0;
`

const controlCss = css<{ $active: boolean }>`
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

export const CategorySelect = styled.select<{ $active: boolean }>`
  ${controlCss}
  appearance: none;
  max-width: 140px;
  text-overflow: ellipsis;
`

export const TypeBtn = styled.button<{ $active: boolean }>`
  ${controlCss}

  &:active {
    background: ${({ theme, $active }) => ($active ? theme.colors.primary : 'none')};
    border-color: ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.textMuted};
    color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.textMuted)};
  }
`
