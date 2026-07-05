import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Transaction } from '../api/types'
import { transactionApi } from '../api/endpoints'
import { PageWrapper, PageTitle, Button, ErrorMsg } from '../components/Layout.styled'
import { StarRating } from '../components/StarRating'
import {
  TabBar,
  Tab,
  TxCard,
  TxTitle,
  TxMeta,
  TxContact,
  TxActions,
  RateRow,
} from './TransactionsPage.styled'

const RATEABLE = new Set<Transaction['status']>(['ACCEPTED', 'RETURNED', 'COMPLETED'])

export function TransactionsPage() {
  const { t } = useTranslation(['transactions', 'common'])
  const [tab, setTab] = useState<'incoming' | 'outgoing'>('incoming')
  const [txs, setTxs] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [actionError, setActionError] = useState('')
  const [pendingRatings, setPendingRatings] = useState<Record<string, number>>({})

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

  async function doAction(fn: () => Promise<void>) {
    try {
      await fn()
      load()
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Fehler')
    }
  }

  async function submitRating(txId: string) {
    const stars = pendingRatings[txId]
    if (!stars) return
    await doAction(() => transactionApi.rate(txId, stars).then(() => undefined))
    setPendingRatings((prev) => {
      const next = { ...prev }
      delete next[txId]
      return next
    })
  }

  const CONTACT_ICON: Record<string, string> = {
    EMAIL: '✉️',
    SMS: '💬',
    WHATSAPP: '📱',
    SIGNAL: '🔒',
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
          <TxCard key={tx.id}>
            <TxTitle>{tx.offer.title}</TxTitle>
            <TxMeta>
              <span>{t(`transactions:status.${tx.status}`)}</span>
              <span>
                {tx.kudos} {t('common:currencyPlural', { ns: 'common' })}
              </span>
              {tab === 'incoming' && tx.requester && (
                <Link to={`/users/${tx.requesterId}`}>@{tx.requester.username}</Link>
              )}
              {tab === 'outgoing' && tx.owner && (
                <Link to={`/users/${tx.ownerId}`}>@{tx.owner.username}</Link>
              )}
            </TxMeta>
            {tab === 'incoming' && tx.contactType && (
              <TxContact>
                {t('transactions:contactLabel')}: {CONTACT_ICON[tx.contactType] ?? '📞'}{' '}
                {tx.contactValue}
              </TxContact>
            )}
            {tx.message && (
              <TxContact>
                {t('transactions:messageLabel')}: {tx.message}
              </TxContact>
            )}
            {/* Rating row — owner rates requester on accepted/completed incoming requests */}
            {tab === 'incoming' && RATEABLE.has(tx.status) && (
              <RateRow>
                {tx.rating ? (
                  <>
                    <span>Bewertet:</span>
                    <StarRating value={tx.rating.stars} readOnly />
                  </>
                ) : (
                  <>
                    <span>Bewerten:</span>
                    <StarRating
                      value={pendingRatings[tx.id] ?? null}
                      onChange={(stars) =>
                        setPendingRatings((prev) => ({ ...prev, [tx.id]: stars }))
                      }
                    />
                    {pendingRatings[tx.id] && (
                      <Button onClick={() => submitRating(tx.id)}>Speichern</Button>
                    )}
                  </>
                )}
              </RateRow>
            )}
            <TxActions>
              {tab === 'incoming' && tx.status === 'PENDING' && (
                <>
                  <Button onClick={() => doAction(() => transactionApi.accept(tx.id))}>
                    {t('transactions:acceptButton')}
                  </Button>
                  <Button
                    $variant="secondary"
                    onClick={() => doAction(() => transactionApi.decline(tx.id))}
                  >
                    {t('transactions:declineButton')}
                  </Button>
                </>
              )}
              {tab === 'incoming' && tx.status === 'ACCEPTED' && tx.type === 'LEND' && (
                <Button onClick={() => doAction(() => transactionApi.return(tx.id))}>
                  {t('transactions:returnButton')}
                </Button>
              )}
              {tab === 'outgoing' && tx.status === 'PENDING' && (
                <Button
                  $variant="danger"
                  onClick={() => doAction(() => transactionApi.cancel(tx.id))}
                >
                  {t('transactions:cancelButton')}
                </Button>
              )}
            </TxActions>
          </TxCard>
        ))
      )}
    </PageWrapper>
  )
}
