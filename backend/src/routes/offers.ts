import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { OfferCategory, OfferType } from '@prisma/client'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import { validate } from '../middleware/validate'
import { AppError, ErrorCode } from '../errors'
import { imageStorage, withImageUrl } from '../storage/imageStorage'
import { searchOffers } from './offerSearch'
import { createOfferSchema, offerCategories, offerPublicSelect } from './offerSchemas'

const router = Router()

router.get('/offers', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const typeParam = req.query.type as string | undefined
    const typeFilter: OfferType | undefined =
      typeParam === 'LEND' || typeParam === 'GIVE' ? typeParam : undefined

    const categoryParam = req.query.category as string | undefined
    const categoryFilter: OfferCategory | undefined = (
      offerCategories as readonly string[]
    ).includes(categoryParam ?? '')
      ? (categoryParam as OfferCategory)
      : undefined

    const zipParam = req.query.zip as string | undefined
    const zips = zipParam
      ? zipParam
          .split(',')
          .map((z) => z.trim())
          .filter(Boolean)
      : undefined

    const rawQ = (req.query.q as string | undefined)?.trim().slice(0, 80)
    if (rawQ) {
      const offers = await searchOffers({ q: rawQ, typeFilter, categoryFilter, zips })
      return res.json({ offers: offers.map(withImageUrl), nextCursor: null })
    }

    const cursor = req.query.cursor as string | undefined
    const limit = Math.min(parseInt((req.query.limit as string) || '10', 10) || 10, 50)

    const rows = await db.offer.findMany({
      where: {
        status: 'AVAILABLE',
        ...(typeFilter !== undefined ? { type: typeFilter } : {}),
        ...(categoryFilter !== undefined ? { category: categoryFilter } : {}),
        ...(zips && zips.length > 0 ? { address: { zip: { in: zips } } } : {}),
      },
      select: offerPublicSelect,
      orderBy: { createdAt: 'desc' },
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    })

    const hasMore = rows.length > limit
    const offers = hasMore ? rows.slice(0, limit) : rows
    const nextCursor = hasMore ? offers[offers.length - 1].id : null

    res.json({ offers: offers.map(withImageUrl), nextCursor })
  } catch (err) {
    next(err)
  }
})

router.get('/offers/mine', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const offers = await db.offer.findMany({
      where: { ownerId: req.user!.id },
      select: offerPublicSelect,
      orderBy: { createdAt: 'desc' },
    })
    res.json({ offers: offers.map(withImageUrl) })
  } catch (err) {
    next(err)
  }
})

router.get('/offers/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const offer = await db.offer.findUnique({
      where: { id: req.params.id },
      select: offerPublicSelect,
    })
    if (!offer) throw new AppError(ErrorCode.NOT_FOUND, 404)
    res.json({ offer: withImageUrl(offer) })
  } catch (err) {
    next(err)
  }
})

router.post(
  '/offers',
  requireAuth,
  validate(createOfferSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as z.infer<typeof createOfferSchema>
      const address = await db.address.findUnique({ where: { id: body.addressId } })
      if (!address || address.userId !== req.user!.id) {
        throw new AppError(ErrorCode.NOT_FOUND, 404)
      }
      const imageRef = await imageStorage.save(body.image)
      const offer = await db.offer.create({
        data: {
          ownerId: req.user!.id,
          title: body.title,
          description: body.description,
          type: body.type,
          category: body.category,
          addressId: body.addressId,
          imageRef,
        },
        select: offerPublicSelect,
      })
      res.status(201).json({ offer: withImageUrl(offer) })
    } catch (err) {
      next(err)
    }
  },
)

export { router as offersRouter }
