import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { Offer } from '../api/types'
import { offerApi } from '../api/endpoints'
import { OfferGrid } from '../components/OfferGrid'

export function OffersPage() {
  const { t } = useTranslation(['offers', 'common'])
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    offerApi
      .list()
      .then(({ offers: o }) => setOffers(o))
      .catch(() => setError(t('offers:loadError')))
      .finally(() => setLoading(false))
  }, [t])

  if (error) return null
  if (loading) return null

  return <OfferGrid offers={offers} emptyMessage={t('offers:noOffers')} />
}
