import styled from 'styled-components'

export const AdminTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.md};
`

export const AdminRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  flex-wrap: wrap;
  font-size: 0.85rem;
`

export const AdminCell = styled.div`
  flex: 1;
  min-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:last-child {
    flex: 0;
    min-width: unset;
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
