import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import { validate } from '../middleware/validate'
import { AppError, ErrorCode } from '../errors'

const router = Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /\d.*\d.*\d.*\d.*\d.*\d.*\d/

const requestSchema = z.object({
  contactType: z.enum(['SMS', 'WHATSAPP', 'SIGNAL', 'EMAIL']),
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
      if (offer.ownerId === req.user!.id) throw new AppError(ErrorCode.FORBIDDEN, 403)

      if (body.contactType === 'EMAIL' && !EMAIL_RE.test(body.contactValue)) {
        throw new AppError(ErrorCode.CONTACT_INVALID, 422)
      }
      if (['SMS', 'WHATSAPP', 'SIGNAL'].includes(body.contactType) && !PHONE_RE.test(body.contactValue)) {
        throw new AppError(ErrorCode.CONTACT_INVALID, 422)
      }

      const kudos = offer.type === 'LEND' ? 1 : 5
      const requester = await db.user.findUniqueOrThrow({ where: { id: req.user!.id } })
      if (requester.kudosBalance < kudos) throw new AppError(ErrorCode.INSUFFICIENT_KUDOS, 402)

      const [transaction] = await db.$transaction([
        db.transaction.create({
          data: {
            offerId: offer.id,
            requesterId: req.user!.id,
            ownerId: offer.ownerId,
            type: offer.type,
            kudos,
            contactType: body.contactType,
            contactValue: body.contactValue,
            message: body.message,
          },
        }),
        db.offer.update({ where: { id: offer.id }, data: { status: 'RESERVED' } }),
      ])

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

      if (role === 'incoming') {
        const rows = await db.transaction.findMany({
          where: { ownerId: userId },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            status: true,
            kudos: true,
            type: true,
            message: true,
            contactType: true,
            contactValue: true,
            ownerConfirmed: true,
            requesterConfirmed: true,
            requesterId: true,
            createdAt: true,
            decidedAt: true,
            offer: { select: { title: true } },
            requester: { select: { id: true, username: true } },
            ratings: { select: { id: true, stars: true, raterId: true } },
          },
        })
        return res.json({ transactions: rows })
      }

      const rows = await db.transaction.findMany({
        where: { requesterId: userId },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          status: true,
          kudos: true,
          type: true,
          message: true,
          ownerConfirmed: true,
          requesterConfirmed: true,
          createdAt: true,
          decidedAt: true,
          ownerId: true,
          offer: { select: { title: true } },
          ratings: { select: { id: true, stars: true, raterId: true } },
        },
      })

      const ownerIds = [...new Set(rows.map((r) => r.ownerId))]
      const owners = await db.user.findMany({
        where: { id: { in: ownerIds } },
        select: { id: true, username: true },
      })
      const ownerMap = new Map(owners.map((o) => [o.id, { id: o.id, username: o.username }]))

      const transactions = rows.map(({ ownerId, ...r }) => ({
        ...r,
        ownerId,
        owner: ownerMap.get(ownerId) ?? null,
      }))
      res.json({ transactions })
    } catch (err) {
      next(err)
    }
  },
)

export { router as transactionsRouter }
