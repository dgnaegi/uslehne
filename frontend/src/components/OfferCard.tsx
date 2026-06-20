import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Offer } from '../api/types'
import { Card, ImageArea, Body, Title, Meta, Location, TypeBadge } from './OfferCard.styled'

interface Props {
  offer: Offer
}

export function OfferCard({ offer }: Props) {
  const { t } = useTranslation('common')
  const color = offer.type === 'LEND' ? '#FFE9A0' : '#B8F0D4'

  return (
    <Card as={Link} to={`/offers/${offer.id}`}>
      <ImageArea $color={color}>
        {offer.imageRef.startsWith('data:image/svg') ? (
          <span>📦</span>
        ) : (
          <img src={offer.imageRef} alt={offer.title} />
        )}
      </ImageArea>
      <Body>
        <TypeBadge $type={offer.type}>{t(`offerType.${offer.type}`)}</TypeBadge>
        <Title>{offer.title}</Title>
        <Meta>
          <Location>📍 {offer.address.city}</Location>
          <span>@{offer.owner.username}</span>
        </Meta>
      </Body>
    </Card>
  )
}
