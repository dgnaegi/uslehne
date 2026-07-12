import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { Transaction } from '../api/types'
import { transactionApi } from '../api/endpoints'
import { useAuth } from '../auth/AuthContext'
import { PageWrapper, PageTitle } from '../components/Layout.styled'
import { ErrorMsg } from '../components/Form.styled'
import { TransactionCard } from '../components/TransactionCard'
import { TabBar, Tab } from './TransactionsPage.styled'

export function TransactionsPage() {
  const { t } = useTranslation(['transactions', 'common'])
  const { user } = useAuth()
  const [tab, setTab] = useState<'open' | 'closed'>('open')
  const [txs, setTxs] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [actionError, setActionError] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    setActionError('')
    transactionApi
      .list(tab)
      .then(({ transactions }) => setTxs(transactions))
      .catch((err: unknown) =>
        setActionError(err instanceof Error ? err.message : 'Da ist etwas schiefgelaufen.'),
      )
      .finally(() => setLoading(false))
  }, [tab])

  useEffect(() => {
    load()
  }, [load])

  async function doAction(fn: () => Promise<unknown>) {
    try {
      await fn()
      load()
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Da ist etwas schiefgelaufen.')
    }
  }

  return (
    <PageWrapper>
      <PageTitle>{t('transactions:title')}</PageTitle>
      <TabBar>
        <Tab $active={tab === 'open'} onClick={() => setTab('open')}>
          {t('transactions:open')}
        </Tab>
        <Tab $active={tab === 'closed'} onClick={() => setTab('closed')}>
          {t('transactions:closed')}
        </Tab>
      </TabBar>
      {actionError && <ErrorMsg>{actionError}</ErrorMsg>}
      {loading ? (
        <p>{t('common:actions.loading')}</p>
      ) : txs.length === 0 ? (
        <p>{tab === 'open' ? t('transactions:noOpen') : t('transactions:noClosed')}</p>
      ) : (
        txs.map((tx) => (
          <TransactionCard
            key={tx.id}
            tx={tx}
            amOwner={tx.ownerId === user?.id}
            onAction={doAction}
          />
        ))
      )}
    </PageWrapper>
  )
}
