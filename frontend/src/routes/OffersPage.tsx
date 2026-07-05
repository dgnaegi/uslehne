import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useOfferFeed } from '../hooks/useOfferFeed'
import { usePageMeta } from '../hooks/usePageMeta'
import { OfferGrid } from '../components/OfferGrid'
import { ZipFilter } from '../components/ZipFilter'
import { SearchBar } from '../components/SearchBar'

export function OffersPage() {
  const { t } = useTranslation('offers')
  const [searchParams, setSearchParams] = useSearchParams()
  const [zips, setZips] = useState<string[]>([])
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')

  const handleSearch = useCallback(
    (q: string) => {
      setQuery(q)
      setSearchParams(q ? { q } : {}, { replace: true })
    },
    [setSearchParams],
  )

  const { offers, loading, loadMore, hasMore } = useOfferFeed(zips, query)

  usePageMeta(
    query
      ? `${query} – Angebote in der Schweiz | uslehne`
      : 'Angebote ausleihen & verschenken in der Schweiz | uslehne',
    'Gegenstände ausleihen und kostenlos erhalten in deiner Nachbarschaft. Werkzeug, Kinderwagen, Elektronik und mehr – teilen statt kaufen auf uslehne.ch.',
  )

  const emptyMessage = query ? t('noSearchResults', { q: query }) : t('noOffers')

  return (
    <>
      <ZipFilter zips={zips} onZipsChange={setZips} />
      <SearchBar onSearch={handleSearch} defaultValue={query} />
      <OfferGrid
        offers={offers}
        emptyMessage={emptyMessage}
        loadMore={loadMore}
        hasMore={hasMore}
        loading={loading}
      />
    </>
  )
}
