import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { Offer, OfferType } from '../api/types'
import { offerApi } from '../api/endpoints'
import { OfferGrid } from '../components/OfferGrid'
import { PageWrapper, PageTitle } from '../components/Layout.styled'
import { Filters, FilterButton } from './OffersPage.styled'

type Filter = 'ALL' | OfferType

export function OffersPage() {
  const { t } = useTranslation(['offers', 'common'])
  const [filter, setFilter] = useState<Filter>('ALL')
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    offerApi
      .list(filter === 'ALL' ? undefined : filter)
      .then(({ offers: o }) => setOffers(o))
      .catch(() => setError(t('offers:loadError')))
      .finally(() => setLoading(false))
  }, [filter, t])

  return (
    <PageWrapper>
      <PageTitle>{t('offers:title')}</PageTitle>
      <Filters>
        {(['ALL', 'LEND', 'GIVE'] as Filter[]).map((f) => (
          <FilterButton key={f} $active={filter === f} onClick={() => setFilter(f)}>
            {f === 'ALL'
              ? t('offers:filterAll')
              : f === 'LEND'
                ? t('offers:filterLend')
                : t('offers:filterGive')}
          </FilterButton>
        ))}
      </Filters>
      {error && <p>{error}</p>}
      {loading ? (
        <p>{t('common:actions.loading')}</p>
      ) : (
        <OfferGrid offers={offers} emptyMessage={t('offers:noOffers')} />
      )}
    </PageWrapper>
  )
}
