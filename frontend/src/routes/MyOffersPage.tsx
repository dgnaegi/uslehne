import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Offer } from '../api/types'
import { offerApi } from '../api/endpoints'
import { PageWrapper, PageTitle, Button, Badge } from '../components/Layout.styled'
import {
  OfferRow,
  OfferRowTitle,
  OfferRowMeta,
  OfferRowBottom,
  TopBar,
} from './MyOffersPage.styled'
import { SwipeToDelete } from '../components/SwipeToDelete'

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

  async function deleteOffer(id: string, title: string) {
    if (!confirm(`Angebot «${title}» wirklich löschen?`)) return
    await offerApi.delete(id)
    setOffers((prev) => prev.filter((o) => o.id !== id))
  }

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
          <SwipeToDelete
            key={offer.id}
            disabled={offer.status !== 'AVAILABLE'}
            onDelete={() => deleteOffer(offer.id, offer.title)}
          >
            <OfferRow>
              <OfferRowTitle>{offer.title}</OfferRowTitle>
              <OfferRowMeta>
                <Badge $type={offer.type}>{t(`common:offerType.${offer.type}`)}</Badge>
                <span>{t(`common:status.${offer.status}`)}</span>
              </OfferRowMeta>
              <OfferRowBottom>
                <Button $variant="secondary" onClick={() => navigate(`/offers/${offer.id}/edit`)}>
                  {t('common:actions.edit')}
                </Button>
              </OfferRowBottom>
            </OfferRow>
          </SwipeToDelete>
        ))
      )}
    </PageWrapper>
  )
}
