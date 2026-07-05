import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useOfferFeed } from '../hooks/useOfferFeed'
import { OfferGrid } from '../components/OfferGrid'
import { ZipFilter } from '../components/ZipFilter'
import { SearchBar } from '../components/SearchBar'

export function OffersPage() {
  const { t } = useTranslation('offers')
  const [zips, setZips] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const handleSearch = useCallback((q: string) => setQuery(q), [])
  const { offers, loading, loadMore, hasMore } = useOfferFeed(zips, query)

  const emptyMessage = query ? t('noSearchResults', { q: query }) : t('noOffers')

  if (loading) return null

  return (
    <>
      <ZipFilter zips={zips} onZipsChange={setZips} />
      <SearchBar onSearch={handleSearch} />
      <OfferGrid
        offers={offers}
        emptyMessage={emptyMessage}
        loadMore={loadMore}
        hasMore={hasMore}
      />
    </>
  )
}
