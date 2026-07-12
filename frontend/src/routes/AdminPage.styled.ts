import styled from 'styled-components'

export const AdminTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.md};
`

export const AdminRow = styled.div<{ $expanded?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  flex-wrap: wrap;
  font-size: 0.85rem;
  cursor: pointer;

  > div {
    overflow: ${({ $expanded }) => ($expanded ? 'visible' : 'hidden')};
    text-overflow: ${({ $expanded }) => ($expanded ? 'unset' : 'ellipsis')};
    white-space: ${({ $expanded }) => ($expanded ? 'normal' : 'nowrap')};
    word-break: ${({ $expanded }) => ($expanded ? 'break-all' : 'normal')};
  }
`

export const AdminCell = styled.div`
  flex: 1;
  min-width: 100px;

  &:last-child {
    flex: 0;
    min-width: unset;
  }
`

export const DeleteBtn = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.danger};
  opacity: 0.6;
  transition: opacity 0.15s;
  padding: 0;
  margin-left: auto;

  &:hover {
    opacity: 1;
  }
`

export const RoleBadge = styled.span<{ $admin?: boolean }>`
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${({ theme, $admin }) => ($admin ? theme.colors.primary : theme.colors.border)};
  color: ${({ theme, $admin }) => ($admin ? '#fff' : theme.colors.textMuted)};
  text-transform: uppercase;
`
