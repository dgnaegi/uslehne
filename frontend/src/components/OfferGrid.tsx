import type { Offer } from '../api/types'
import { OfferCard } from './OfferCard'
import { Feed, Empty } from './OfferGrid.styled'

interface Props {
  offers: Offer[]
  emptyMessage: string
}

export function OfferGrid({ offers, emptyMessage }: Props) {
  if (offers.length === 0) return <Empty>{emptyMessage}</Empty>
  return (
    <Feed>
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </Feed>
  )
}
