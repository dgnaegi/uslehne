import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import { validate } from '../middleware/validate'
import { AppError, ErrorCode, assertFound, assertOwns } from '../errors'
import { imageStorage, withImageUrl } from '../storage/imageStorage'
import { cleanupImage } from '../storage/imageCleanup'
import { patchOfferSchema, offerPublicSelect } from './offerSchemas'

const router = Router()

router.patch(
  '/offers/:id',
  requireAuth,
  validate(patchOfferSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as z.infer<typeof patchOfferSchema>
      const existing = await db.offer.findUnique({ where: { id: req.params.id } })
      assertFound(existing)
      assertOwns(existing.ownerId, req.user!.id)

      const imageRef = body.image ? await imageStorage.save(body.image) : undefined
      const offer = await db.offer.update({
        where: { id: req.params.id },
        data: {
          ...(body.title !== undefined ? { title: body.title } : {}),
          ...(body.description !== undefined ? { description: body.description } : {}),
          ...(body.category !== undefined ? { category: body.category } : {}),
          ...(imageRef !== undefined ? { imageRef } : {}),
          ...(body.status !== undefined ? { status: body.status } : {}),
        },
        select: offerPublicSelect,
      })
      if (imageRef !== undefined && imageRef !== existing.imageRef) {
        await cleanupImage(existing.imageRef)
      }
      res.json({ offer: withImageUrl(offer) })
    } catch (err) {
      next(err)
    }
  },
)

router.delete(
  '/offers/:id',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const existing = await db.offer.findUnique({ where: { id: req.params.id } })
      assertFound(existing)
      assertOwns(existing.ownerId, req.user!.id)

      const blocking = await db.transaction.findFirst({
        where: { offerId: req.params.id, status: { in: ['PENDING', 'ACCEPTED'] } },
      })
      if (blocking) throw new AppError(ErrorCode.OFFER_NOT_AVAILABLE, 409)

      await db.$transaction(async (tx) => {
        await tx.transaction.deleteMany({ where: { offerId: req.params.id } })
        await tx.offer.delete({ where: { id: req.params.id } })
      })
      await cleanupImage(existing.imageRef)
      res.status(204).end()
    } catch (err) {
      next(err)
    }
  },
)

export { router as offersMutateRouter }
