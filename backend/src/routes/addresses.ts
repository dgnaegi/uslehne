import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import { validate } from '../middleware/validate'
import { AppError, ErrorCode, assertFound, assertOwns } from '../errors'

const router = Router()

const createAddressSchema = z.object({
  zip: z.string().min(1),
  city: z.string().optional(),
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
      const address = await db.address.create({
        data: { userId: req.user!.id, zip, city, label },
      })
      res.status(201).json({ address })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        return next(new AppError(ErrorCode.ADDRESS_DUPLICATE_ZIP, 409))
      }
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
      assertFound(address)
      assertOwns(address.userId, req.user!.id)

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
