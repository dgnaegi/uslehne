import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import { validate } from '../middleware/validate'
import { AppError, ErrorCode } from '../errors'
import { sendMailSilent } from '../services/mail'
import { offerRequestedMail } from '../services/mailTemplatesTransactions'

const router = Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /\d.*\d.*\d.*\d.*\d.*\d.*\d/
const USERNAME_RE = /^@?[a-zA-Z0-9_.]{3,32}$/

const requestSchema = z.object({
  contactType: z.enum(['SMS', 'WHATSAPP', 'SIGNAL', 'SIGNAL_USERNAME', 'TELEGRAM', 'EMAIL']),
  contactValue: z.string().min(1),
  message: z.string().optional(),
})

router.post(
  '/offers/:id/request',
  requireAuth,
  validate(requestSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as z.infer<typeof requestSchema>
      const offer = await db.offer.findUnique({ where: { id: req.params.id } })
      if (!offer || offer.status !== 'AVAILABLE') {
        throw new AppError(ErrorCode.OFFER_NOT_AVAILABLE, 409)
      }
      if (offer.ownerId === req.user!.id) throw new AppError(ErrorCode.OWN_OFFER, 403)

      const ownOpenRequest = await db.transaction.findFirst({
        where: {
          offerId: offer.id,
          requesterId: req.user!.id,
          status: { in: ['PENDING', 'ACCEPTED'] },
        },
      })
      if (ownOpenRequest) throw new AppError(ErrorCode.ALREADY_REQUESTED, 409)

      if (body.contactType === 'EMAIL' && !EMAIL_RE.test(body.contactValue)) {
        throw new AppError(ErrorCode.CONTACT_INVALID, 422)
      }
      if (
        ['SMS', 'WHATSAPP', 'SIGNAL'].includes(body.contactType) &&
        !PHONE_RE.test(body.contactValue)
      ) {
        throw new AppError(ErrorCode.CONTACT_INVALID, 422)
      }
      if (
        ['SIGNAL_USERNAME', 'TELEGRAM'].includes(body.contactType) &&
        !USERNAME_RE.test(body.contactValue)
      ) {
        throw new AppError(ErrorCode.CONTACT_INVALID, 422)
      }

      const karma = offer.type === 'LEND' ? 1 : 2
      const requester = await db.user.findUniqueOrThrow({ where: { id: req.user!.id } })
      if (requester.karmaBalance < karma) throw new AppError(ErrorCode.INSUFFICIENT_KARMA, 402)

      const transaction = await db.transaction.create({
        data: {
          offerId: offer.id,
          requesterId: req.user!.id,
          ownerId: offer.ownerId,
          type: offer.type,
          karma,
          contactType: body.contactType,
          contactValue: body.contactValue,
          message: body.message,
        },
      })

      const owner = await db.user.findUnique({
        where: { id: offer.ownerId },
        select: { email: true, username: true },
      })
      if (owner) {
        const { subject, html } = offerRequestedMail({
          ownerUsername: owner.username,
          requesterUsername: requester.username,
          offerTitle: offer.title,
          contactType: body.contactType,
          contactValue: body.contactValue,
          message: body.message,
        })
        sendMailSilent({ to: owner.email, subject, html })
      }

      res.status(201).json({ transaction })
    } catch (err) {
      next(err)
    }
  },
)

router.get(
  '/transactions',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = req.query.role as string | undefined
      const userId = req.user!.id

      const sharedSelect = {
        id: true,
        status: true,
        karma: true,
        type: true,
        message: true,
        contactType: true,
        contactValue: true,
        ownerConfirmed: true,
        requesterConfirmed: true,
        ownerId: true,
        requesterId: true,
        createdAt: true,
        decidedAt: true,
        offer: { select: { title: true, type: true } },
        requester: { select: { id: true, username: true } },
        owner: { select: { id: true, username: true } },
        ratings: { select: { id: true, stars: true, raterId: true } },
      } as const

      if (role === 'incoming') {
        const rows = await db.transaction.findMany({
          where: { ownerId: userId },
          orderBy: { createdAt: 'desc' },
          select: sharedSelect,
        })
        return res.json({ transactions: rows })
      }

      const openStatuses = ['PENDING', 'ACCEPTED'] as const
      const closedStatuses = ['DECLINED', 'CANCELLED', 'RETURNED', 'COMPLETED'] as const

      if (role === 'open' || role === 'closed') {
        const statuses = role === 'open' ? openStatuses : closedStatuses
        const rows = await db.transaction.findMany({
          where: {
            OR: [{ ownerId: userId }, { requesterId: userId }],
            status: { in: [...statuses] },
          },
          orderBy: { createdAt: 'desc' },
          select: sharedSelect,
        })
        return res.json({ transactions: rows })
      }

      const rows = await db.transaction.findMany({
        where: { requesterId: userId },
        orderBy: { createdAt: 'desc' },
        select: sharedSelect,
      })
      res.json({ transactions: rows })
    } catch (err) {
      next(err)
    }
  },
)

export { router as transactionsRouter }
