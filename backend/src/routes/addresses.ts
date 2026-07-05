import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import { validate } from '../middleware/validate'
import { AppError, ErrorCode } from '../errors'

const router = Router()

const createAddressSchema = z.object({
  zip: z.string().min(1),
  city: z.string().min(1),
  label: z.string().optional(),
})

router.get('/addresses', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const addresses = await db.address.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ addresses })
  } catch (err) {
    next(err)
  }
})

router.post(
  '/addresses',
  requireAuth,
  validate(createAddressSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { zip, city, label } = req.body as z.infer<typeof createAddressSchema>
      const cityLower = city.trim().toLowerCase()
      if (cityLower !== 'zürich' && cityLower !== 'zurich') {
        throw new AppError(ErrorCode.ADDRESS_CITY_NOT_ALLOWED, 422)
      }
      const address = await db.address.create({
        data: { userId: req.user!.id, zip, city, label },
      })
      res.status(201).json({ address })
    } catch (err) {
      next(err)
    }
  },
)

router.delete(
  '/addresses/:id',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = await db.address.findUnique({ where: { id: req.params.id } })
      if (!address) throw new AppError(ErrorCode.NOT_FOUND, 404)
      if (address.userId !== req.user!.id) throw new AppError(ErrorCode.FORBIDDEN, 403)

      const activeOffer = await db.offer.findFirst({
        where: { addressId: req.params.id, status: { not: 'ARCHIVED' } },
      })
      if (activeOffer) throw new AppError(ErrorCode.ADDRESS_IN_USE, 409)

      await db.address.delete({ where: { id: req.params.id } })
      res.status(204).end()
    } catch (err) {
      next(err)
    }
  },
)

export default router
