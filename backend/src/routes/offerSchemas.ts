import { z } from 'zod'

export const offerCategories = [
  'KLEIDUNG',
  'MOEBEL',
  'HAUSHALT',
  'ELEKTROGERAETE',
  'KINDER',
  'BUECHER',
  'HOBBY',
  'ANDERE',
] as const

export const createOfferSchema = z.object({
  title: z.string().min(1).max(80),
  description: z.string().min(1).max(2000),
  type: z.enum(['LEND', 'GIVE']),
  category: z.enum(offerCategories),
  addressId: z.string().min(1),
  image: z.string().min(1),
})

export const patchOfferSchema = z.object({
  title: z.string().min(1).max(80).optional(),
  description: z.string().min(1).max(2000).optional(),
  type: z.enum(['LEND', 'GIVE']).optional(),
  category: z.enum(offerCategories).optional(),
  image: z.string().optional(),
  status: z.enum(['ARCHIVED']).optional(),
})

export const offerPublicSelect = {
  id: true,
  ownerId: true,
  addressId: true,
  title: true,
  description: true,
  type: true,
  category: true,
  status: true,
  imageRef: true,
  createdAt: true,
  updatedAt: true,
  owner: { select: { username: true } },
  address: { select: { zip: true, city: true } },
}
