import { db } from '../db'
import { offerPublicSelect } from './offers'

export async function searchOffers(opts: {
  q: string
  typeFilter?: 'LEND' | 'GIVE'
  zips?: string[]
}) {
  const { q, typeFilter, zips } = opts

  const offers = await db.offer.findMany({
    where: {
      status: 'AVAILABLE',
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ],
      ...(typeFilter ? { type: typeFilter } : {}),
      ...(zips?.length ? { address: { zip: { in: zips } } } : {}),
    },
    select: offerPublicSelect,
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return offers
}
