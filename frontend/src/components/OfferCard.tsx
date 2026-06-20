import { Offer, CATEGORY_COLOR } from '../data/offers'
import { Card, ImageArea, Body, Title, Meta, Location, Badge } from './OfferCard.styled'

interface Props {
  offer: Offer
}

export function OfferCard({ offer }: Props) {
  return (
    <Card>
      <ImageArea $color={CATEGORY_COLOR[offer.category]}>{offer.emoji}</ImageArea>
      <Body>
        <Badge $type="category">{offer.category}</Badge>
        <Title>{offer.title}</Title>
        <Meta>
          <Location>📍 {offer.location}</Location>
          <Badge $type="status">{offer.type}</Badge>
        </Meta>
      </Body>
    </Card>
  )
}
