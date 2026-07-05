import { Fragment, useRef, useEffect } from 'react'
import type { Offer } from '../api/types'
import { OfferCard } from './OfferCard'
import { Feed, Empty, CenteredSpinner } from './OfferGrid.styled'

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

  if (loading && offers.length === 0) {
    return (
      <Feed ref={feedRef}>
        <CenteredSpinner />
      </Feed>
    )
  }

  if (offers.length === 0) return <Empty>{emptyMessage}</Empty>

  const sentinelAfterIndex = Math.max(0, offers.length - 4)

  return (
    <Feed ref={feedRef} $loading={loading}>
      {offers.map((offer, i) => (
        <Fragment key={offer.id}>
          <OfferCard offer={offer} />
          {i === sentinelAfterIndex && hasMore && <div ref={sentinelRef} />}
        </Fragment>
      ))}
    </Feed>
  )
}
