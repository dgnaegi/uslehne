import type { Offer } from '../api/types'
import { OfferCard } from './OfferCard'
import { Grid, Empty } from './OfferGrid.styled'

interface Props {
  offers: Offer[]
  emptyMessage: string
}

export function OfferGrid({ offers, emptyMessage }: Props) {
  if (offers.length === 0) return <Empty>{emptyMessage}</Empty>
  return (
    <Grid>
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </Grid>
  )
}
