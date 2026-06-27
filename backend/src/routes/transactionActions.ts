import { Router, Request, Response, NextFunction } from 'express'
import { Prisma, LedgerReason, OfferStatus } from '@prisma/client'
import { z } from 'zod'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import { validate } from '../middleware/validate'
import { AppError, ErrorCode } from '../errors'

const router = Router()

router.post(
  '/transactions/:id/accept',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tx = await db.transaction.findUnique({ where: { id: req.params.id } })
      if (!tx) throw new AppError(ErrorCode.NOT_FOUND, 404)
      if (tx.ownerId !== req.user!.id) throw new AppError(ErrorCode.FORBIDDEN, 403)
      if (tx.status !== 'PENDING') throw new AppError(ErrorCode.INVALID_TRANSACTION_STATUS, 409)

      await db.$transaction(async (prisma: Prisma.TransactionClient) => {
        const requester = await prisma.user.findUniqueOrThrow({ where: { id: tx.requesterId } })
        if (requester.kudosBalance < tx.kudos) {
          throw new AppError(ErrorCode.INSUFFICIENT_KUDOS, 402)
        }
        const borrowReason: LedgerReason = tx.type === 'LEND' ? 'BORROW_SPEND' : 'RECEIVE_SPEND'
        const earnReason: LedgerReason = tx.type === 'LEND' ? 'LEND_EARN' : 'GIVE_EARN'
        const offerStatus: OfferStatus = tx.type === 'LEND' ? 'LENT' : 'GIVEN'
        const now = new Date()
        await prisma.user.update({
          where: { id: tx.requesterId },
          data: { kudosBalance: { decrement: tx.kudos } },
        })
        await prisma.kudoLedger.create({
          data: {
            userId: tx.requesterId,
            delta: -tx.kudos,
            reason: borrowReason,
            transactionId: tx.id,
          },
        })
        await prisma.user.update({
          where: { id: tx.ownerId },
          data: { kudosBalance: { increment: tx.kudos } },
        })
        await prisma.kudoLedger.create({
          data: { userId: tx.ownerId, delta: tx.kudos, reason: earnReason, transactionId: tx.id },
        })
        await prisma.transaction.update({
          where: { id: tx.id },
          data: { status: 'ACCEPTED', decidedAt: now },
        })
        await prisma.offer.update({ where: { id: tx.offerId }, data: { status: offerStatus } })
        await prisma.transaction.updateMany({
          where: { offerId: tx.offerId, id: { not: tx.id }, status: 'PENDING' },
          data: { status: 'DECLINED' },
        })
      })

      res.json({ ok: true })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/transactions/:id/decline',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tx = await db.transaction.findUnique({ where: { id: req.params.id } })
      if (!tx) throw new AppError(ErrorCode.NOT_FOUND, 404)
      if (tx.ownerId !== req.user!.id) throw new AppError(ErrorCode.FORBIDDEN, 403)
      if (tx.status !== 'PENDING') throw new AppError(ErrorCode.INVALID_TRANSACTION_STATUS, 409)

      await db.transaction.update({
        where: { id: tx.id },
        data: { status: 'DECLINED', decidedAt: new Date() },
      })
      const remaining = await db.transaction.count({
        where: { offerId: tx.offerId, status: 'PENDING' },
      })
      if (remaining === 0) {
        await db.offer.update({ where: { id: tx.offerId }, data: { status: 'AVAILABLE' } })
      }
      res.json({ ok: true })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/transactions/:id/cancel',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tx = await db.transaction.findUnique({ where: { id: req.params.id } })
      if (!tx) throw new AppError(ErrorCode.NOT_FOUND, 404)
      if (tx.requesterId !== req.user!.id) throw new AppError(ErrorCode.FORBIDDEN, 403)
      if (tx.status !== 'PENDING') throw new AppError(ErrorCode.INVALID_TRANSACTION_STATUS, 409)

      await db.transaction.update({ where: { id: tx.id }, data: { status: 'CANCELLED' } })
      const remaining = await db.transaction.count({
        where: { offerId: tx.offerId, status: 'PENDING' },
      })
      if (remaining === 0) {
        await db.offer.update({ where: { id: tx.offerId }, data: { status: 'AVAILABLE' } })
      }
      res.json({ ok: true })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/transactions/:id/return',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tx = await db.transaction.findUnique({ where: { id: req.params.id } })
      if (!tx) throw new AppError(ErrorCode.NOT_FOUND, 404)
      if (tx.ownerId !== req.user!.id) throw new AppError(ErrorCode.FORBIDDEN, 403)
      if (tx.status !== 'ACCEPTED' || tx.type !== 'LEND') {
        throw new AppError(ErrorCode.INVALID_TRANSACTION_STATUS, 409)
      }

      await db.transaction.update({
        where: { id: tx.id },
        data: { status: 'COMPLETED', returnedAt: new Date() },
      })
      await db.offer.update({ where: { id: tx.offerId }, data: { status: 'AVAILABLE' } })
      res.json({ ok: true })
    } catch (err) {
      next(err)
    }
  },
)

const rateSchema = z.object({ stars: z.number().int().min(1).max(5) })

router.post(
  '/transactions/:id/rate',
  requireAuth,
  validate(rateSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tx = await db.transaction.findUnique({
        where: { id: req.params.id },
        include: { rating: true },
      })
      if (!tx) throw new AppError(ErrorCode.NOT_FOUND, 404)
      if (tx.ownerId !== req.user!.id) throw new AppError(ErrorCode.FORBIDDEN, 403)
      if (!['ACCEPTED', 'RETURNED', 'COMPLETED'].includes(tx.status)) {
        throw new AppError(ErrorCode.INVALID_TRANSACTION_STATUS, 409)
      }
      if (tx.rating) throw new AppError(ErrorCode.ALREADY_RATED, 409)

      const { stars } = req.body as z.infer<typeof rateSchema>
      const rating = await db.rating.create({
        data: {
          stars,
          raterId: req.user!.id,
          ratedId: tx.requesterId,
          transactionId: tx.id,
        },
      })
      res.status(201).json({ rating })
    } catch (err) {
      next(err)
    }
  },
)

export { router as transactionActionsRouter }
