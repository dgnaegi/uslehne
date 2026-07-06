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

      await db.$transaction([
        db.transaction.update({
          where: { id: tx.id },
          data: { status: 'ACCEPTED', decidedAt: new Date() },
        }),
        db.transaction.updateMany({
          where: { offerId: tx.offerId, id: { not: tx.id }, status: 'PENDING' },
          data: { status: 'DECLINED' },
        }),
      ])

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

// Both requester and owner can withdraw — pending or accepted (before exchange confirmed)
router.post(
  '/transactions/:id/cancel',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tx = await db.transaction.findUnique({ where: { id: req.params.id } })
      if (!tx) throw new AppError(ErrorCode.NOT_FOUND, 404)
      const isParty = tx.requesterId === req.user!.id || tx.ownerId === req.user!.id
      if (!isParty) throw new AppError(ErrorCode.FORBIDDEN, 403)
      if (!['PENDING', 'ACCEPTED'].includes(tx.status)) {
        throw new AppError(ErrorCode.INVALID_TRANSACTION_STATUS, 409)
      }

      await db.transaction.update({ where: { id: tx.id }, data: { status: 'CANCELLED' } })
      await db.offer.update({ where: { id: tx.offerId }, data: { status: 'AVAILABLE' } })
      res.json({ ok: true })
    } catch (err) {
      next(err)
    }
  },
)

// Either party confirms the exchange happened. When both confirm → kudos booked + COMPLETED.
router.post(
  '/transactions/:id/confirm',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tx = await db.transaction.findUnique({ where: { id: req.params.id } })
      if (!tx) throw new AppError(ErrorCode.NOT_FOUND, 404)
      if (tx.status !== 'ACCEPTED') throw new AppError(ErrorCode.INVALID_TRANSACTION_STATUS, 409)

      const isOwner = tx.ownerId === req.user!.id
      const isRequester = tx.requesterId === req.user!.id
      if (!isOwner && !isRequester) throw new AppError(ErrorCode.FORBIDDEN, 403)

      const update = isOwner ? { ownerConfirmed: true } : { requesterConfirmed: true }
      const updated = await db.transaction.update({
        where: { id: tx.id },
        data: update,
      })

      const bothConfirmed = updated.ownerConfirmed && updated.requesterConfirmed
      if (bothConfirmed) {
        await db.$transaction(async (prisma: Prisma.TransactionClient) => {
          const requester = await prisma.user.findUniqueOrThrow({ where: { id: tx.requesterId } })
          if (requester.kudosBalance < tx.kudos) {
            throw new AppError(ErrorCode.INSUFFICIENT_KUDOS, 402)
          }
          const borrowReason: LedgerReason = tx.type === 'LEND' ? 'BORROW_SPEND' : 'RECEIVE_SPEND'
          const earnReason: LedgerReason = tx.type === 'LEND' ? 'LEND_EARN' : 'GIVE_EARN'
          const offerStatus: OfferStatus = tx.type === 'LEND' ? 'AVAILABLE' : 'GIVEN'

          await prisma.user.update({
            where: { id: tx.requesterId },
            data: { kudosBalance: { decrement: tx.kudos } },
          })
          await prisma.kudoLedger.create({
            data: { userId: tx.requesterId, delta: -tx.kudos, reason: borrowReason, transactionId: tx.id },
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
            data: { status: 'COMPLETED', returnedAt: new Date() },
          })
          await prisma.offer.update({ where: { id: tx.offerId }, data: { status: offerStatus } })
        })
      }

      res.json({ ok: true, completed: bothConfirmed })
    } catch (err) {
      next(err)
    }
  },
)

const rateSchema = z.object({ stars: z.number().int().min(1).max(5) })

// Both owner and requester can rate each other after exchange is accepted/completed
router.post(
  '/transactions/:id/rate',
  requireAuth,
  validate(rateSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tx = await db.transaction.findUnique({
        where: { id: req.params.id },
        include: { ratings: true },
      })
      if (!tx) throw new AppError(ErrorCode.NOT_FOUND, 404)
      if (!['ACCEPTED', 'COMPLETED'].includes(tx.status)) {
        throw new AppError(ErrorCode.INVALID_TRANSACTION_STATUS, 409)
      }

      const isOwner = tx.ownerId === req.user!.id
      const isRequester = tx.requesterId === req.user!.id
      if (!isOwner && !isRequester) throw new AppError(ErrorCode.FORBIDDEN, 403)

      const alreadyRated = tx.ratings.some((r) => r.raterId === req.user!.id)
      if (alreadyRated) throw new AppError(ErrorCode.ALREADY_RATED, 409)

      const ratedId = isOwner ? tx.requesterId : tx.ownerId
      const { stars } = req.body as z.infer<typeof rateSchema>
      const rating = await db.rating.create({
        data: { stars, raterId: req.user!.id, ratedId, transactionId: tx.id },
      })
      res.status(201).json({ rating })
    } catch (err) {
      next(err)
    }
  },
)

export { router as transactionActionsRouter }
