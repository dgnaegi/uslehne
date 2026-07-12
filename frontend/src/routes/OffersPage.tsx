import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { OfferCategory, OfferType } from '../api/types'
import { useOfferFeed } from '../hooks/useOfferFeed'
import { usePageMeta } from '../hooks/usePageMeta'
import { OfferGrid } from '../components/OfferGrid'
import { ZipFilter } from '../components/ZipFilter'

export function OffersPage() {
  const { t } = useTranslation('offers')
  const [searchParams] = useSearchParams()
  const [zips, setZips] = useState<string[]>([])
  const [offerType, setOfferType] = useState<OfferType | null>(null)
  const [category, setCategory] = useState<OfferCategory | null>(null)
  const query = searchParams.get('q') ?? ''

  const { offers, loading, loadMore, hasMore } = useOfferFeed(zips, query, offerType, category)

  usePageMeta(
    query
      ? `${query} – Angebote in der Schweiz | uslehne`
      : 'Angebote ausleihen & verschenken in der Schweiz | uslehne',
    'Gegenstände ausleihen und kostenlos erhalten in deiner Nachbarschaft. Werkzeug, Kinderwagen, Elektronik und mehr – teilen statt kaufen auf uslehne.ch.',
  )

  const emptyMessage = query ? t('noSearchResults', { q: query }) : t('noOffers')

  return (
    <>
      <ZipFilter
        zips={zips}
        onZipsChange={setZips}
        offerType={offerType}
        onOfferTypeChange={setOfferType}
        category={category}
        onCategoryChange={setCategory}
      />
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
