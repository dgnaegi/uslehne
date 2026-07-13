import { Fragment, useRef, useEffect, useState } from 'react'
import type { Offer } from '../api/types'
import { useAuth } from '../auth/AuthContext'
import { OfferCard } from './OfferCard'
import { RequestDialog } from './RequestDialog'
import { Feed, Empty, SpinnerCenter } from './OfferGrid.styled'
import { Spinner } from './Spinner'

interface Props {
  offers: Offer[]
  emptyMessage: string
  loadMore: () => void
  hasMore: boolean
  loading?: boolean
}

export function OfferGrid({ offers, emptyMessage, loadMore, hasMore, loading }: Props) {
  const { user, openAuthModal } = useAuth()
  const [requestOffer, setRequestOffer] = useState<Offer | null>(null)
  const feedRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (loading) feedRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [loading])

  useEffect(() => {
    const sentinel = sentinelRef.current
    const feed = feedRef.current
    if (!sentinel || !feed || !hasMore) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore()
      },
      { root: feed, threshold: 0 },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, loadMore, offers.length])

  function handleSwipeRight(offer: Offer) {
    if (!user) {
      openAuthModal()
      return
    }
    setRequestOffer(offer)
  }

  if (loading && offers.length === 0) {
    return (
      <Feed ref={feedRef}>
        <SpinnerCenter>
          <Spinner size={40} />
        </SpinnerCenter>
      </Feed>
    )
  }

  if (offers.length === 0) return <Empty>{emptyMessage}</Empty>

  const sentinelAfterIndex = Math.max(0, offers.length - 4)

  return (
    <>
      <Feed ref={feedRef} $loading={loading}>
        {offers.map((offer, i) => (
          <Fragment key={offer.id}>
            <OfferCard offer={offer} onSwipeRight={() => handleSwipeRight(offer)} />
            {i === sentinelAfterIndex && hasMore && <div ref={sentinelRef} />}
          </Fragment>
        ))}
      </Feed>
      {requestOffer && (
        <RequestDialog
          offerId={requestOffer.id}
          offerType={requestOffer.type}
          onClose={() => setRequestOffer(null)}
        />
      )}
    </>
  )
}
