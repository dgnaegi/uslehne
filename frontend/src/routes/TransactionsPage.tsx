import { useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IconMail, IconMessageSquare, IconSmartphone, IconShield, IconPhone } from '../icons'
import type { Transaction } from '../api/types'
import { transactionApi } from '../api/endpoints'
import { ProcessTimeline } from '../components/ProcessTimeline'
import { getActiveTimelineStep } from '../utils/processTimeline'
import { PageWrapper, PageTitle, Button, ErrorMsg } from '../components/Layout.styled'
import { StarRating } from '../components/StarRating'
import {
  TabBar,
  Tab,
  TxCard,
  TxTitle,
  TxMeta,
  TxContact,
  TxContactLink,
  TxActions,
  RateRow,
} from './TransactionsPage.styled'

function buildContactUrl(type: string, value: string): string {
  switch (type) {
    case 'WHATSAPP':
      return `https://wa.me/${value.replace(/\D/g, '')}`
    case 'SMS':
      return `sms:${value.replace(/\s/g, '')}`
    case 'SIGNAL':
      return `https://signal.me/#p/${value.replace(/\s/g, '')}`
    case 'EMAIL':
      return `mailto:${value}`
    default:
      return ''
  }
}

const RATEABLE = new Set<Transaction['status']>(['COMPLETED', 'RETURNED'])

const CONTACT_ICON: Record<string, ReactNode> = {
  EMAIL: <IconMail size={14} />,
  SMS: <IconMessageSquare size={14} />,
  WHATSAPP: <IconSmartphone size={14} />,
  SIGNAL: <IconShield size={14} />,
}

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

  async function doAction(fn: () => Promise<unknown>) {
    try {
      await fn()
      load()
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Da ist etwas schiefgelaufen.')
    }
  }

  async function submitRating(txId: string) {
    const stars = pendingRatings[txId]
    if (!stars) return
    await doAction(() => transactionApi.rate(txId, stars))
    setPendingRatings((prev) => {
      const next = { ...prev }
      delete next[txId]
      return next
    })
  }

  const amOwner = tab === 'incoming'

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
        txs.map((tx) => {
          const myConfirmed = amOwner ? tx.ownerConfirmed : tx.requesterConfirmed
          const myId = amOwner ? tx.ownerId : tx.requesterId
          const hasRated = tx.ratings.some((r) => r.raterId === myId)
          const canCancel =
            (tab === 'outgoing' && tx.status === 'PENDING') || tx.status === 'ACCEPTED'

          return (
            <TxCard key={tx.id}>
              <TxTitle>{tx.offer.title}</TxTitle>
              {(tx.status === 'PENDING' ||
                tx.status === 'ACCEPTED' ||
                tx.status === 'RETURNED') && (
                <ProcessTimeline
                  offerType={tx.offer.type}
                  activeStep={getActiveTimelineStep(tx)}
                  compact
                  role={amOwner ? 'owner' : 'requester'}
                />
              )}
              <TxMeta>
                <span>{t(`transactions:status.${tx.status}`)}</span>
                <span>
                  {tx.kudos} {t('common:currencyPlural', { ns: 'common' })}
                </span>
                {amOwner && tx.requester && (
                  <Link to={`/users/${tx.requesterId}`}>@{tx.requester.username}</Link>
                )}
                {!amOwner && tx.owner && (
                  <Link to={`/users/${tx.ownerId}`}>@{tx.owner.username}</Link>
                )}
              </TxMeta>
              {amOwner && tx.contactType && tx.contactValue && (
                <TxContact>
                  {t('transactions:contactLabel')}:{' '}
                  <TxContactLink
                    href={buildContactUrl(tx.contactType, tx.contactValue)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {CONTACT_ICON[tx.contactType] ?? <IconPhone size={14} />} {tx.contactValue}
                  </TxContactLink>
                </TxContact>
              )}
              {tx.message && (
                <TxContact>
                  {t('transactions:messageLabel')}: {tx.message}
                </TxContact>
              )}
              {tx.status === 'ACCEPTED' && myConfirmed && (
                <TxContact>{t('transactions:alreadyConfirmed')}</TxContact>
              )}
              {tx.status === 'ACCEPTED' && !amOwner && (
                <TxContact>{t('transactions:acceptedOutgoing')}</TxContact>
              )}
              {RATEABLE.has(tx.status) && (
                <RateRow>
                  {hasRated ? (
                    <>
                      <span>Bewertet:</span>
                      <StarRating
                        value={tx.ratings.find((r) => r.raterId === myId)?.stars ?? null}
                        readOnly
                      />
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
                        <Button onClick={() => submitRating(tx.id)}>Bewertung abgeben</Button>
                      )}
                    </>
                  )}
                </RateRow>
              )}
              <TxActions>
                {amOwner && tx.status === 'PENDING' && (
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
                {tx.status === 'ACCEPTED' && !myConfirmed && (
                  <Button onClick={() => doAction(() => transactionApi.confirm(tx.id))}>
                    {t('transactions:confirmButton')}
                  </Button>
                )}
                {canCancel && (
                  <Button
                    $variant="danger"
                    onClick={() => doAction(() => transactionApi.cancel(tx.id))}
                  >
                    {t('transactions:cancelButton')}
                  </Button>
                )}
              </TxActions>
            </TxCard>
          )
        })
      )}
    </PageWrapper>
  )
}
