import { Router, Request, Response, NextFunction } from 'express'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import { AppError, ErrorCode } from '../errors'
import { sendMail } from '../services/mail'
import { offerAcceptedMail, offerDeclinedMail } from '../services/mailTemplatesTransactions'

const router = Router()

router.post(
  '/transactions/:id/accept',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tx = await db.transaction.findUnique({
        where: { id: req.params.id },
        include: {
          offer: { select: { title: true } },
          requester: { select: { email: true, username: true } },
        },
      })
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

      const owner = await db.user.findUnique({
        where: { id: tx.ownerId },
        select: { username: true },
      })
      if (owner) {
        const { subject, html } = offerAcceptedMail({
          requesterUsername: tx.requester.username,
          ownerUsername: owner.username,
          offerTitle: tx.offer.title,
        })
        sendMail({ to: tx.requester.email, subject, html }).catch(console.error)
      }

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
      const tx = await db.transaction.findUnique({
        where: { id: req.params.id },
        include: {
          offer: { select: { title: true } },
          requester: { select: { email: true, username: true } },
        },
      })
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

      const { subject, html } = offerDeclinedMail({
        requesterUsername: tx.requester.username,
        offerTitle: tx.offer.title,
      })
      sendMail({ to: tx.requester.email, subject, html }).catch(console.error)

      res.json({ ok: true })
    } catch (err) {
      next(err)
    }
  },
)

export { router as transactionDecisionsRouter }
