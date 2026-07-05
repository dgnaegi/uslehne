import { Fragment, useRef, useEffect } from 'react'
import type { Offer } from '../api/types'
import { OfferCard } from './OfferCard'
import { Feed, Empty, SpinnerOverlay, Spinner } from './OfferGrid.styled'

interface Props {
  offers: Offer[]
  emptyMessage: string
  loadMore: () => void
  hasMore: boolean
  loading?: boolean
}

export function OfferGrid({ offers, emptyMessage, loadMore, hasMore, loading }: Props) {
  const feedRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Trigger load when sentinel (3 cards before end) scrolls into the feed viewport
  useEffect(() => {
    const sentinel = sentinelRef.current
    const feed = feedRef.current
    if (!sentinel || !feed || !hasMore) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore()
      },
      {
        root: feed,
        threshold: 0,
      },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, loadMore, offers.length])

  if (loading)
    return (
      <SpinnerOverlay>
        <Spinner />
      </SpinnerOverlay>
    )

  if (offers.length === 0) return <Empty>{emptyMessage}</Empty>

  const sentinelAfterIndex = Math.max(0, offers.length - 4)

  return (
    <Feed ref={feedRef}>
      {offers.map((offer, i) => (
        <Fragment key={offer.id}>
          <OfferCard offer={offer} />
          {i === sentinelAfterIndex && hasMore && <div ref={sentinelRef} />}
        </Fragment>
      ))}
    </Feed>
  )
}
