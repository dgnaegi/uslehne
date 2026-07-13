import { OfferCategory } from '@prisma/client'
import { db } from '../db'
import { offerPublicSelect } from './offerSchemas'

export async function searchOffers(opts: {
  q: string
  typeFilter?: 'LEND' | 'GIVE'
  categoryFilter?: OfferCategory
  zips?: string[]
}) {
  const { q, typeFilter, categoryFilter, zips } = opts

  const offers = await db.offer.findMany({
    where: {
      status: { in: ['AVAILABLE', 'LENT'] },
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ],
      ...(typeFilter ? { type: typeFilter } : {}),
      ...(categoryFilter ? { category: categoryFilter } : {}),
      ...(zips?.length ? { address: { zip: { in: zips } } } : {}),
    },
    select: offerPublicSelect,
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return offers
}
