import { Offer } from '../data/offers'
import { Card, ImageArea, Body, Title, Meta, Location, Badge } from './OfferCard.styled'

interface Props {
  offer: Offer
}

export function OfferCard({ offer }: Props) {
  return (
    <Card>
      <ImageArea>{offer.emoji}</ImageArea>
      <Body>
        <Badge $type="category">{offer.category}</Badge>
        <Title>{offer.title}</Title>
        <Meta>
          <Location>📍 {offer.location}</Location>
          <Badge $type="type">{offer.type}</Badge>
        </Meta>
      </Body>
    </Card>
  )
}
