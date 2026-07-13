import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import type { User, AdminOffer } from '../api/types'
import { adminApi } from '../api/endpoints'
import { PageWrapper, PageTitle } from '../components/Layout.styled'
import { ErrorMsg } from '../components/Form.styled'
import { TabBar, Tab } from './TransactionsPage.styled'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { AdminUserList } from './AdminUserList'
import { AdminOfferList } from './AdminOfferList'

interface PendingDelete {
  kind: 'user' | 'offer'
  id: string
  name: string
}

export function AdminPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'users' | 'offers'>('users')
  const [users, setUsers] = useState<User[]>([])
  const [offers, setOffers] = useState<AdminOffer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null)

  useEffect(() => {
    if (user && user.role !== 'ADMIN') navigate('/offers', { replace: true })
  }, [user, navigate])

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      if (tab === 'users') {
        const { users: u } = await adminApi.users()
        setUsers(u)
      } else {
        const { offers: o } = await adminApi.offers()
        setOffers(o)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler')
    } finally {
      setLoading(false)
    }
  }, [tab])

  useEffect(() => {
    load()
  }, [load])

  async function confirmDelete() {
    if (!pendingDelete) return
    const { kind, id } = pendingDelete
    setPendingDelete(null)
    try {
      if (kind === 'user') {
        await adminApi.deleteUser(id)
        setUsers((prev) => prev.filter((u) => u.id !== id))
      } else {
        await adminApi.deleteOffer(id)
        setOffers((prev) => prev.filter((o) => o.id !== id))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler')
    }
  }

  if (!user || user.role !== 'ADMIN') return null

  return (
    <PageWrapper>
      <PageTitle>Admin</PageTitle>
      <TabBar>
        <Tab $active={tab === 'users'} onClick={() => setTab('users')}>
          Benutzer {tab === 'users' && !loading ? `(${users.length})` : ''}
        </Tab>
        <Tab $active={tab === 'offers'} onClick={() => setTab('offers')}>
          Angebote {tab === 'offers' && !loading ? `(${offers.length})` : ''}
        </Tab>
      </TabBar>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {loading ? (
        <p>Laden…</p>
      ) : tab === 'users' ? (
        <AdminUserList
          users={users}
          currentUserId={user.id}
          expandedId={expandedId}
          onToggle={setExpandedId}
          onDelete={(u) => setPendingDelete({ kind: 'user', id: u.id, name: `@${u.username}` })}
        />
      ) : (
        <AdminOfferList
          offers={offers}
          expandedId={expandedId}
          onToggle={setExpandedId}
          onDelete={(o) => setPendingDelete({ kind: 'offer', id: o.id, name: o.title })}
        />
      )}
      {pendingDelete && (
        <ConfirmDialog
          title={pendingDelete.kind === 'user' ? 'Benutzer löschen' : 'Angebot löschen'}
          message={`«${pendingDelete.name}» wirklich dauerhaft löschen?`}
          confirmLabel="Löschen"
          danger
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </PageWrapper>
  )
}
