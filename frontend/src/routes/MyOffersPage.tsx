import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Offer } from '../api/types'
import { offerApi } from '../api/endpoints'
import { PageWrapper, PageTitle, Button, Badge } from '../components/Layout.styled'
import { OfferRow, OfferRowTitle, OfferRowMeta, TopBar } from './MyOffersPage.styled'

export function MyOffersPage() {
  const { t } = useTranslation(['offers', 'common'])
  const navigate = useNavigate()
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    offerApi
      .mine()
      .then(({ offers: o }) => setOffers(o))
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageWrapper>
      <TopBar>
        <PageTitle>{t('offers:myOffers')}</PageTitle>
        <Button onClick={() => navigate('/offers/new')}>{t('offers:createOffer')}</Button>
      </TopBar>
      {loading ? (
        <p>{t('common:actions.loading')}</p>
      ) : offers.length === 0 ? (
        <p>{t('offers:noMyOffers')}</p>
      ) : (
        offers.map((offer) => (
          <OfferRow key={offer.id}>
            <div>
              <OfferRowTitle>{offer.title}</OfferRowTitle>
              <OfferRowMeta>
                <Badge $type={offer.type}>{t(`common:offerType.${offer.type}`)}</Badge>
                <span>{t(`common:status.${offer.status}`)}</span>
              </OfferRowMeta>
            </div>
            <Button $variant="secondary" onClick={() => navigate(`/offers/${offer.id}/edit`)}>
              {t('common:actions.edit')}
            </Button>
          </OfferRow>
        ))
      )}
    </PageWrapper>
  )
}
