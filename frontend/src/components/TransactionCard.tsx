import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IconMail, IconMessageSquare, IconSmartphone, IconShield, IconPhone } from '../icons'
import type { Transaction } from '../api/types'
import { transactionApi } from '../api/endpoints'
import { ProcessTimeline } from './ProcessTimeline'
import { getActiveTimelineStep } from '../utils/processTimeline'
import { Button } from './Layout.styled'
import { StarRating } from './StarRating'
import {
  TxCard,
  TxTitle,
  TxMeta,
  TxContact,
  TxContactLink,
  TxActions,
  RateRow,
} from './TransactionCard.styled'

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

interface TransactionCardProps {
  tx: Transaction
  amOwner: boolean
  onAction: (fn: () => Promise<unknown>) => Promise<void>
}

export function TransactionCard({ tx, amOwner, onAction }: TransactionCardProps) {
  const { t } = useTranslation(['transactions', 'common'])
  const [pendingStars, setPendingStars] = useState<number | null>(null)

  const myConfirmed = amOwner ? tx.ownerConfirmed : tx.requesterConfirmed
  const myId = amOwner ? tx.ownerId : tx.requesterId
  const hasRated = tx.ratings.some((r) => r.raterId === myId)
  const canCancel = (!amOwner && tx.status === 'PENDING') || tx.status === 'ACCEPTED'

  async function submitRating() {
    if (!pendingStars) return
    await onAction(() => transactionApi.rate(tx.id, pendingStars))
    setPendingStars(null)
  }

  return (
    <TxCard>
      <TxTitle>{tx.offer.title}</TxTitle>
      {(tx.status === 'PENDING' || tx.status === 'ACCEPTED' || tx.status === 'RETURNED') && (
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
        {!amOwner && tx.owner && <Link to={`/users/${tx.ownerId}`}>@{tx.owner.username}</Link>}
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
              <StarRating value={pendingStars} onChange={setPendingStars} />
              {pendingStars && <Button onClick={submitRating}>Bewertung abgeben</Button>}
            </>
          )}
        </RateRow>
      )}
      <TxActions>
        {amOwner && tx.status === 'PENDING' && (
          <>
            <Button onClick={() => onAction(() => transactionApi.accept(tx.id))}>
              {t('transactions:acceptButton')}
            </Button>
            <Button
              $variant="secondary"
              onClick={() => onAction(() => transactionApi.decline(tx.id))}
            >
              {t('transactions:declineButton')}
            </Button>
          </>
        )}
        {tx.status === 'ACCEPTED' && !myConfirmed && (
          <Button onClick={() => onAction(() => transactionApi.confirm(tx.id))}>
            {t('transactions:confirmButton')}
          </Button>
        )}
        {canCancel && (
          <Button $variant="danger" onClick={() => onAction(() => transactionApi.cancel(tx.id))}>
            {t('transactions:cancelButton')}
          </Button>
        )}
      </TxActions>
    </TxCard>
  )
}
