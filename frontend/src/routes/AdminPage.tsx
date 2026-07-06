import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import type { User, AdminOffer } from '../api/types'
import { adminApi } from '../api/endpoints'
import { PageWrapper, PageTitle, Button, ErrorMsg } from '../components/Layout.styled'
import { TabBar, Tab } from './TransactionsPage.styled'
import { AdminTable, AdminRow, AdminCell, RoleBadge } from './AdminPage.styled'

export function AdminPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'users' | 'offers'>('users')
  const [users, setUsers] = useState<User[]>([])
  const [offers, setOffers] = useState<AdminOffer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  async function deleteUser(id: string, username: string) {
    if (!confirm(`Benutzer "${username}" wirklich löschen?`)) return
    try {
      await adminApi.deleteUser(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler')
    }
  }

  async function deleteOffer(id: string, title: string) {
    if (!confirm(`Angebot "${title}" wirklich löschen?`)) return
    try {
      await adminApi.deleteOffer(id)
      setOffers((prev) => prev.filter((o) => o.id !== id))
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
        <AdminTable>
          {users.map((u) => (
            <AdminRow key={u.id}>
              <AdminCell>
                <strong>@{u.username}</strong>
              </AdminCell>
              <AdminCell>{u.email}</AdminCell>
              <AdminCell>
                <RoleBadge $admin={u.role === 'ADMIN'}>{u.role}</RoleBadge>
              </AdminCell>
              <AdminCell>{u.kudosBalance} Kudos</AdminCell>
              <AdminCell>
                <Button
                  $variant="danger"
                  disabled={u.id === user.id}
                  onClick={() => deleteUser(u.id, u.username)}
                >
                  Löschen
                </Button>
              </AdminCell>
            </AdminRow>
          ))}
        </AdminTable>
      ) : (
        <AdminTable>
          {offers.map((o) => (
            <AdminRow key={o.id}>
              <AdminCell>
                <strong>{o.title}</strong>
              </AdminCell>
              <AdminCell>@{o.owner.username}</AdminCell>
              <AdminCell>{o.address.zip} {o.address.city}</AdminCell>
              <AdminCell>{o.type === 'LEND' ? 'Leihen' : 'Schenken'}</AdminCell>
              <AdminCell>{o.status}</AdminCell>
              <AdminCell>
                <Button $variant="danger" onClick={() => deleteOffer(o.id, o.title)}>
                  Löschen
                </Button>
              </AdminCell>
            </AdminRow>
          ))}
        </AdminTable>
      )}
    </PageWrapper>
  )
}
