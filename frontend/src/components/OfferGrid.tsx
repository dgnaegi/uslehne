import { useState } from 'react'
import { OFFERS, CATEGORIES, Category } from '../data/offers'
import { OfferCard } from './OfferCard'
import { Section, SectionTitle, Filters, FilterButton, Grid, Empty } from './OfferGrid.styled'

export function OfferGrid() {
  const [active, setActive] = useState<Category>('Alle')

  const filtered = active === 'Alle'
    ? OFFERS
    : OFFERS.filter((o) => o.category === active)

  return (
    <Section>
      <SectionTitle>Angebote</SectionTitle>
      <Filters>
        {CATEGORIES.map((cat) => (
          <FilterButton key={cat} $active={active === cat} onClick={() => setActive(cat)}>
            {cat}
          </FilterButton>
        ))}
      </Filters>
      {filtered.length === 0 ? (
        <Empty>Keine Angebote in dieser Kategorie.</Empty>
      ) : (
        <Grid>
          {filtered.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </Grid>
      )}
    </Section>
  )
}
