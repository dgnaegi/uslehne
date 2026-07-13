import { Router, Request, Response, NextFunction } from 'express'
import { db } from '../db'
import { requireAuth, requireAdmin } from '../middleware/requireAuth'
import { AppError, ErrorCode } from '../errors'
import { cleanupImage } from '../storage/imageCleanup'

const router = Router()

router.get(
  '/admin/users',
  requireAuth,
  requireAdmin,
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await db.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          karmaBalance: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      })
      res.json({ users })
    } catch (err) {
      next(err)
    }
  },
)

router.delete(
  '/admin/users/:id',
  requireAuth,
  requireAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      if (id === req.user!.id) throw new AppError(ErrorCode.FORBIDDEN, 403)

      const offers = await db.offer.findMany({
        where: { ownerId: id },
        select: { id: true, imageRef: true },
      })
      const offerIds = offers.map((o) => o.id)

      const requesterTxIds = (
        await db.transaction.findMany({ where: { requesterId: id }, select: { id: true } })
      ).map((t) => t.id)

      const ownerTxIds = (
        await db.transaction.findMany({
          where: { offerId: { in: offerIds } },
          select: { id: true },
        })
      ).map((t) => t.id)

      await db.$transaction([
        db.rating.deleteMany({
          where: {
            OR: [
              { raterId: id },
              { ratedId: id },
              { transactionId: { in: [...requesterTxIds, ...ownerTxIds] } },
            ],
          },
        }),
        db.transaction.deleteMany({
          where: { OR: [{ requesterId: id }, { offerId: { in: offerIds } }] },
        }),
        db.karmaLedger.deleteMany({ where: { userId: id } }),
        db.passwordResetToken.deleteMany({ where: { userId: id } }),
        db.invite.updateMany({ where: { usedById: id }, data: { usedById: null, usedAt: null } }),
        db.invite.deleteMany({ where: { createdById: id } }),
        db.offer.deleteMany({ where: { ownerId: id } }),
        db.address.deleteMany({ where: { userId: id } }),
        db.user.delete({ where: { id } }),
      ])

      for (const offer of offers) {
        await cleanupImage(offer.imageRef)
      }

      res.json({ ok: true })
    } catch (err) {
      next(err)
    }
  },
)

router.get(
  '/admin/offers',
  requireAuth,
  requireAdmin,
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const offers = await db.offer.findMany({
        select: {
          id: true,
          title: true,
          type: true,
          status: true,
          createdAt: true,
          owner: { select: { id: true, username: true } },
          address: { select: { zip: true, city: true } },
        },
        orderBy: { createdAt: 'desc' },
      })
      res.json({ offers })
    } catch (err) {
      next(err)
    }
  },
)

router.delete(
  '/admin/offers/:id',
  requireAuth,
  requireAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const offer = await db.offer.findUnique({ where: { id: req.params.id } })
      if (!offer) throw new AppError(ErrorCode.NOT_FOUND, 404)

      const txIds = (
        await db.transaction.findMany({ where: { offerId: offer.id }, select: { id: true } })
      ).map((t) => t.id)

      await db.$transaction([
        db.rating.deleteMany({ where: { transactionId: { in: txIds } } }),
        db.transaction.deleteMany({ where: { offerId: offer.id } }),
        db.offer.delete({ where: { id: offer.id } }),
      ])

      await cleanupImage(offer.imageRef)

      res.json({ ok: true })
    } catch (err) {
      next(err)
    }
  },
)

export { router as adminRouter }
