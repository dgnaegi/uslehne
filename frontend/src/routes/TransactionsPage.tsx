import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { Transaction } from '../api/types'
import { transactionApi } from '../api/endpoints'
import { PageWrapper, PageTitle, ErrorMsg } from '../components/Layout.styled'
import { TransactionCard } from '../components/TransactionCard'
import { TabBar, Tab } from './TransactionsPage.styled'

export function TransactionsPage() {
  const { t } = useTranslation(['transactions', 'common'])
  const [tab, setTab] = useState<'incoming' | 'outgoing'>('incoming')
  const [txs, setTxs] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [actionError, setActionError] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    transactionApi
      .list(tab)
      .then(({ transactions }) => setTxs(transactions))
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
        <Tab $active={tab === 'incoming'} onClick={() => setTab('incoming')}>
          {t('transactions:incoming')}
        </Tab>
        <Tab $active={tab === 'outgoing'} onClick={() => setTab('outgoing')}>
          {t('transactions:outgoing')}
        </Tab>
      </TabBar>
      {actionError && <ErrorMsg>{actionError}</ErrorMsg>}
      {loading ? (
        <p>{t('common:actions.loading')}</p>
      ) : txs.length === 0 ? (
        <p>{tab === 'incoming' ? t('transactions:noIncoming') : t('transactions:noOutgoing')}</p>
      ) : (
        txs.map((tx) => (
          <TransactionCard key={tx.id} tx={tx} amOwner={tab === 'incoming'} onAction={doAction} />
        ))
      )}
    </PageWrapper>
  )
}
