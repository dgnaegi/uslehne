import { useState, useEffect, useCallback } from 'react'
import type { Offer, OfferType } from '../api/types'
import { offerApi } from '../api/endpoints'

const PAGE_SIZE = 10

export function useOfferFeed(zips: string[], query?: string, offerType?: OfferType | null) {
  const zipsKey = zips.join(',')
  const [offers, setOffers] = useState<Offer[]>([])
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    const zipList = zipsKey.split(',').filter(Boolean)
    setLoading(true)
    setNextCursor(null)
    offerApi
      .list({
        limit: PAGE_SIZE,
        zips: zipList.length ? zipList : undefined,
        q: query || undefined,
        type: offerType || undefined,
      })
      .then(({ offers: o, nextCursor: nc }) => {
        setOffers(o)
        setNextCursor(nc)
      })
      .finally(() => setLoading(false))
  }, [zipsKey, query, offerType])

  const loadMore = useCallback(() => {
    if (!nextCursor || loadingMore) return
    const zipList = zipsKey.split(',').filter(Boolean)
    setLoadingMore(true)
    offerApi
      .list({
        limit: PAGE_SIZE,
        cursor: nextCursor,
        zips: zipList.length ? zipList : undefined,
        type: offerType || undefined,
      })
      .then(({ offers: o, nextCursor: nc }) => {
        setOffers((prev) => [...prev, ...o])
        setNextCursor(nc)
      })
      .finally(() => setLoadingMore(false))
  }, [nextCursor, loadingMore, zipsKey, offerType])

  return { offers, loading, loadMore, hasMore: nextCursor !== null }
}
