import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOfferFeed } from '../hooks/useOfferFeed'
import { OfferGrid } from '../components/OfferGrid'
import { ZipFilter } from '../components/ZipFilter'

export function OffersPage() {
  const { t } = useTranslation('offers')
  const [zips, setZips] = useState<string[]>([])
  const { offers, loading, loadMore, hasMore } = useOfferFeed(zips)

  if (loading) return null

  return (
    <>
      <ZipFilter zips={zips} onZipsChange={setZips} />
      <OfferGrid
        offers={offers}
        emptyMessage={t('noOffers')}
        loadMore={loadMore}
        hasMore={hasMore}
      />
    </>
  )
}
