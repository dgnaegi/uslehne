import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Offer } from '../api/types'
import { IconBox, IconMapPin } from '../icons'
import {
  Card,
  CardImage,
  CardOverlay,
  TypeBadge,
  CardTitle,
  CardMeta,
  CardZip,
  CardOwner,
} from './OfferCard.styled'

interface Props {
  offer: Offer
}

export function OfferCard({ offer }: Props) {
  const { t } = useTranslation('common')

  return (
    <Card as={Link} to={`/offers/${offer.id}`}>
      <CardImage $type={offer.type}>
        <img src={offer.imageRef} alt={offer.title} />
      </CardImage>
      <CardOverlay>
        <TypeBadge $type={offer.type}>{t(`offerType.${offer.type}`)}</TypeBadge>
        <CardTitle>{offer.title}</CardTitle>
        <CardMeta>
          <CardZip>
            📍 {offer.address.zip} {offer.address.city}
          </CardZip>
          <CardOwner>@{offer.owner.username}</CardOwner>
        </CardMeta>
      </CardOverlay>
    </Card>
  )
}
