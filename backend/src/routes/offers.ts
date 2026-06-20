import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { OfferType } from '@prisma/client'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import { validate } from '../middleware/validate'
import { AppError, ErrorCode } from '../errors'
import { imageStorage } from '../storage/imageStorage'

const router = Router()

export const createOfferSchema = z.object({
  title: z.string().min(1).max(80),
  description: z.string().min(1).max(2000),
  type: z.enum(['LEND', 'GIVE']),
  addressId: z.string().min(1),
  image: z.string().min(1),
})

export const patchOfferSchema = z.object({
  title: z.string().min(1).max(80).optional(),
  description: z.string().min(1).max(2000).optional(),
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
  status: true,
  imageRef: true,
  createdAt: true,
  updatedAt: true,
  owner: { select: { username: true } },
  address: { select: { zip: true } },
}

router.get('/offers', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const typeParam = req.query.type as string | undefined
    const typeFilter: OfferType | undefined =
      typeParam === 'LEND' || typeParam === 'GIVE' ? typeParam : undefined
    const offers = await db.offer.findMany({
      where: {
        status: 'AVAILABLE',
        ...(typeFilter !== undefined ? { type: typeFilter } : {}),
      },
      select: offerPublicSelect,
      orderBy: { createdAt: 'desc' },
    })
    res.json({ offers })
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
    res.json({ offers })
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
    res.json({ offer })
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
          addressId: body.addressId,
          imageRef,
        },
        select: offerPublicSelect,
      })
      res.status(201).json({ offer })
    } catch (err) {
      next(err)
    }
  },
)

export { router as offersRouter }
