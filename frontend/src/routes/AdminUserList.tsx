import type { User } from '../api/types'
import { AdminTable, AdminRow, AdminCell, RoleBadge, DeleteBtn } from './AdminPage.styled'
import { SwipeToDelete } from '../components/SwipeToDelete'
import { IconX } from '../icons/IconX'

interface Props {
  users: User[]
  currentUserId: string
  expandedId: string | null
  onToggle: (id: string | null) => void
  onDelete: (user: User) => void
}

export function AdminUserList({ users, currentUserId, expandedId, onToggle, onDelete }: Props) {
  return (
    <AdminTable>
      {users.map((u) => (
        <SwipeToDelete key={u.id} disabled={u.id === currentUserId} onDelete={() => onDelete(u)}>
          <AdminRow
            $expanded={expandedId === u.id}
            onClick={() => onToggle(expandedId === u.id ? null : u.id)}
          >
            <AdminCell>
              <strong>@{u.username}</strong>
            </AdminCell>
            <AdminCell>{u.email}</AdminCell>
            <AdminCell>
              <RoleBadge $admin={u.role === 'ADMIN'}>{u.role}</RoleBadge>
            </AdminCell>
            <AdminCell>{u.karmaBalance} Karma</AdminCell>
            {u.id !== currentUserId && (
              <DeleteBtn
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(u)
                }}
                aria-label="Benutzer löschen"
              >
                <IconX size={16} />
              </DeleteBtn>
            )}
          </AdminRow>
        </SwipeToDelete>
      ))}
    </AdminTable>
  )
}
