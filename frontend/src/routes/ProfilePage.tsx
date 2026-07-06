import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { LedgerEntry } from '../api/types'
import { kudosApi } from '../api/endpoints'
import { REASON_LABEL, fmtDate } from '../utils/ledger'
import { useAuth } from '../auth/AuthContext'
import { PageWrapper, PageTitle } from '../components/Layout.styled'
import {
  ProfileCard,
  ProfileRow,
  LedgerList,
  LedgerItem,
  Delta,
  LedgerTitle,
} from './ProfilePage.styled'

export function ProfilePage() {
  const { t } = useTranslation('common')
  const { user } = useAuth()
  const [entries, setEntries] = useState<LedgerEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    kudosApi
      .ledger()
      .then(({ entries: e }) => setEntries(e))
      .finally(() => setLoading(false))
  }, [])

  if (!user) return null

  return (
    <PageWrapper>
      <PageTitle>{user.username}</PageTitle>
      <ProfileCard>
        <ProfileRow>
          <span>E-Mail</span>
          <strong>{user.email}</strong>
        </ProfileRow>
        <ProfileRow>
          <span>{t('currencyPlural')}</span>
          <strong>{user.kudosBalance}</strong>
        </ProfileRow>
        <ProfileRow>
          <span>Rolle</span>
          <strong>{user.role}</strong>
        </ProfileRow>
      </ProfileCard>
      <LedgerTitle>{t('currencyPlural')}-Verlauf</LedgerTitle>
      {loading ? (
        <p>{t('actions.loading')}</p>
      ) : (
        <LedgerList>
          {entries.map((e) => (
            <LedgerItem key={e.id}>
              <Delta $positive={e.delta > 0}>
                {e.delta > 0 ? '+' : ''}
                {e.delta}
              </Delta>
              <span>{REASON_LABEL[e.reason]}</span>
              <span>{fmtDate(e.createdAt)}</span>
            </LedgerItem>
          ))}
        </LedgerList>
      )}
    </PageWrapper>
  )
}
