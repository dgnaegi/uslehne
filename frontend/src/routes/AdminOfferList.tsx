import type { AdminOffer } from '../api/types'
import { AdminTable, AdminRow, AdminCell, DeleteBtn } from './AdminPage.styled'
import { SwipeToDelete } from '../components/SwipeToDelete'
import { IconX } from '../icons/IconX'

interface Props {
  offers: AdminOffer[]
  expandedId: string | null
  onToggle: (id: string | null) => void
  onDelete: (offer: AdminOffer) => void
}

export function AdminOfferList({ offers, expandedId, onToggle, onDelete }: Props) {
  return (
    <AdminTable>
      {offers.map((o) => (
        <SwipeToDelete key={o.id} onDelete={() => onDelete(o)}>
          <AdminRow
            $expanded={expandedId === o.id}
            onClick={() => onToggle(expandedId === o.id ? null : o.id)}
          >
            <AdminCell>
              <strong>{o.title}</strong>
            </AdminCell>
            <AdminCell>@{o.owner.username}</AdminCell>
            <AdminCell>{[o.address.zip, o.address.city].filter(Boolean).join(' ')}</AdminCell>
            <AdminCell>{o.type === 'LEND' ? 'Leihen' : 'Schenken'}</AdminCell>
            <AdminCell>{o.status}</AdminCell>
            <DeleteBtn
              onClick={(e) => {
                e.stopPropagation()
                onDelete(o)
              }}
              aria-label="Angebot löschen"
            >
              <IconX size={16} />
            </DeleteBtn>
          </AdminRow>
        </SwipeToDelete>
      ))}
    </AdminTable>
  )
}
