import type { Offer } from '../api/types'

export function buildOfferJsonLd(offer: Offer): string {
  const actionWord = offer.type === 'LEND' ? 'Ausleihen' : 'Verschenken'
  const availability =
    offer.status === 'AVAILABLE' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
  const hasRealImage = !offer.imageRef.startsWith('data:image/svg')
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://uslehne.ch/offers/${offer.id}`,
    name: offer.title,
    description: offer.description,
    ...(hasRealImage && { image: offer.imageRef }),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CHF',
      availability,
      itemCondition: 'https://schema.org/UsedCondition',
      name: `${offer.title} – ${actionWord} in ${offer.address.city ?? offer.address.zip}`,
      areaServed: { '@type': 'Country', name: 'CH' },
      seller: { '@type': 'Person', name: offer.owner.username },
    },
  })
}
