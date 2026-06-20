import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Offer } from '../api/types'
import { Card, CardImage, CardOverlay, CardTitle, CardMeta, TypeBadge } from './OfferCard.styled'

interface Props {
  offer: Offer
}

export function OfferCard({ offer }: Props) {
  const { t } = useTranslation('common')

  return (
    <Card as={Link} to={`/offers/${offer.id}`}>
      <CardImage $type={offer.type}>
        {offer.imageRef.startsWith('data:image/svg') ? (
          <span aria-hidden="true">📦</span>
        ) : (
          <img src={offer.imageRef} alt={offer.title} />
        )}
      </CardImage>
      <CardOverlay>
        <TypeBadge $type={offer.type}>{t(`offerType.${offer.type}`)}</TypeBadge>
        <CardTitle>{offer.title}</CardTitle>
        <CardMeta>
          <span>📍 {offer.address.city}</span>
          <span>@{offer.owner.username}</span>
        </CardMeta>
      </CardOverlay>
    </Card>
  )
}
