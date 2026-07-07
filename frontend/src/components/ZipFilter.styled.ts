import styled from 'styled-components'

export const FilterBar = styled.div<{ $compact?: boolean }>`
  position: ${({ $compact }) => ($compact ? 'static' : 'fixed')};
  top: ${({ theme, $compact }) => ($compact ? 'auto' : theme.headerHeight)};
  left: ${({ $compact }) => ($compact ? 'auto' : '0')};
  right: ${({ $compact }) => ($compact ? 'auto' : '0')};
  z-index: ${({ theme, $compact }) => ($compact ? 0 : theme.zIndex.filterBar)};
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: ${({ theme }) => theme.border};
`


export const MainRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
`

export const ChipsRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `0 ${theme.spacing.md} ${theme.spacing.xs}`};
`

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  white-space: nowrap;
  flex-shrink: 0;
  text-transform: uppercase;
`

export const ChipRemove = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-size: 0.62rem;
  line-height: 1;
  padding: 0;
  opacity: 0.65;
  transition: opacity 0.1s;

  &:hover {
    opacity: 1;
  }
`

export const ZipInput = styled.input`
  height: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.sm};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  font-weight: 700;
  width: 88px;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  flex-shrink: 0;
`

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: 2px solid rgba(26, 26, 26, 0.3);
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  flex-shrink: 0;
  opacity: 0.6;
  transition:
    opacity 0.12s,
    background 0.12s,
    color 0.12s;

  @media (hover: hover) {
    &:hover {
      opacity: 1;
      background: ${({ theme }) => theme.colors.accent};
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  &:active {
    opacity: 0.6;
    background: none;
  }
`

export const TypeFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-left: auto;
  flex-shrink: 0;
`

export const TypeBtn = styled.button<{ $active: boolean }>`
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
      background: ${({ theme, $active }) =>
        $active ? theme.colors.primary : theme.colors.accent};
      border-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.text)};
    }
  }

  &:active {
    background: ${({ theme, $active }) => ($active ? theme.colors.primary : 'none')};
    border-color: ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.textMuted};
    color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.textMuted)};
  }
`
