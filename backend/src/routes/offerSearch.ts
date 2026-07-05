import { Prisma } from '@prisma/client'
import { db } from '../db'
import { offerPublicSelect } from './offers'

function escapeIlike(s: string): string {
  return s.replace(/[\\%_]/g, (c) => `\\${c}`)
}

export async function searchOffers(opts: {
  q: string
  typeFilter?: 'LEND' | 'GIVE'
  zips?: string[]
}) {
  const { q, typeFilter, zips } = opts
  const escaped = escapeIlike(q)

  const rows = await db.$queryRaw<{ id: string }[]>(
    Prisma.sql`
      SELECT id FROM "Offer"
      WHERE status = 'AVAILABLE'
        AND (
          title ILIKE ${'%' + escaped + '%'}
          OR word_similarity(${q}, title) > 0.3
        )
      ORDER BY GREATEST(similarity(title, ${q}), word_similarity(${q}, title)) DESC,
               "createdAt" DESC
      LIMIT 50
    `,
  )

  const orderedIds = rows.map((r) => r.id)
  if (orderedIds.length === 0) return []

  const offers = await db.offer.findMany({
    where: {
      id: { in: orderedIds },
      ...(typeFilter !== undefined ? { type: typeFilter } : {}),
      ...(zips && zips.length > 0 ? { address: { zip: { in: zips } } } : {}),
    },
    select: offerPublicSelect,
  })

  const byId = new Map(offers.map((o) => [o.id, o]))
  return orderedIds.flatMap((id) => {
    const o = byId.get(id)
    return o ? [o] : []
  })
}
