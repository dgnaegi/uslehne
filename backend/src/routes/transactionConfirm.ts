import { Router, Request, Response, NextFunction } from 'express'
import { Prisma, LedgerReason, OfferStatus } from '@prisma/client'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import { AppError, ErrorCode } from '../errors'
import { sendMailSilent } from '../services/mail'
import { confirmReminderMail } from '../services/mailTemplatesTransactions'

const router = Router()

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
      const tx = await db.transaction.findUnique({
        where: { id: req.params.id },
        include: {
          offer: { select: { title: true } },
          requester: { select: { id: true, email: true, username: true } },
        },
      })
      if (!tx) throw new AppError(ErrorCode.NOT_FOUND, 404)
      if (tx.status !== 'ACCEPTED') throw new AppError(ErrorCode.INVALID_TRANSACTION_STATUS, 409)

      const isOwner = tx.ownerId === req.user!.id
      const isRequester = tx.requesterId === req.user!.id
      if (!isOwner && !isRequester) throw new AppError(ErrorCode.FORBIDDEN, 403)

      const update = isOwner ? { ownerConfirmed: true } : { requesterConfirmed: true }
      const updated = await db.transaction.update({ where: { id: tx.id }, data: update })

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
      } else {
        // one party confirmed — fetch owner and remind the other party
        const owner = await db.user.findUnique({
          where: { id: tx.ownerId },
          select: { email: true, username: true },
        })
        if (isOwner && owner) {
          const { subject, html } = confirmReminderMail({
            username: tx.requester.username,
            otherUsername: owner.username,
            offerTitle: tx.offer.title,
          })
          sendMailSilent({ to: tx.requester.email, subject, html })
        } else if (isRequester && owner) {
          const { subject, html } = confirmReminderMail({
            username: owner.username,
            otherUsername: tx.requester.username,
            offerTitle: tx.offer.title,
          })
          sendMailSilent({ to: owner.email, subject, html })
        }
      }

      res.json({ ok: true, completed: bothConfirmed })
    } catch (err) {
      next(err)
    }
  },
)

export { router as transactionConfirmRouter }
