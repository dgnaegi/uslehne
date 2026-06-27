import styled from 'styled-components'

export const FilterBar = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 6px ${({ theme }) => theme.spacing.md};
  background: rgba(253, 250, 240, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.accent};
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
`

export const ChipRemove = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-size: 0.68rem;
  line-height: 1;
  padding: 0;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`

export const ZipInput = styled.input`
  height: 28px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  font-size: 0.82rem;
  width: 88px;
  outline: none;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  flex-shrink: 0;
`

export const AddButton = styled.button`
  background: none;
  border: 2px solid rgba(26, 26, 26, 0.3);
  border-radius: 999px;
  padding: 3px 12px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  flex-shrink: 0;
  opacity: 0.65;

  &:hover {
    opacity: 1;
  }
`
