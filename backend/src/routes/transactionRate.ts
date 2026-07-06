import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import { validate } from '../middleware/validate'
import { AppError, ErrorCode } from '../errors'
import { sendMail } from '../services/mail'
import { ratingReceivedMail } from '../services/mailTemplatesTransactions'

const router = Router()

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
        include: {
          ratings: true,
          offer: { select: { title: true } },
          requester: { select: { id: true, email: true, username: true } },
        },
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

      if (isOwner) {
        // owner rated requester → notify requester
        const rater = await db.user.findUnique({
          where: { id: req.user!.id },
          select: { username: true },
        })
        if (rater) {
          const { subject, html } = ratingReceivedMail({
            username: tx.requester.username,
            raterUsername: rater.username,
            stars,
            offerTitle: tx.offer.title,
          })
          sendMail({ to: tx.requester.email, subject, html }).catch(console.error)
        }
      } else {
        // requester rated owner → notify owner
        const owner = await db.user.findUnique({
          where: { id: tx.ownerId },
          select: { email: true, username: true },
        })
        if (owner) {
          const { subject, html } = ratingReceivedMail({
            username: owner.username,
            raterUsername: tx.requester.username,
            stars,
            offerTitle: tx.offer.title,
          })
          sendMail({ to: owner.email, subject, html }).catch(console.error)
        }
      }

      res.status(201).json({ rating })
    } catch (err) {
      next(err)
    }
  },
)

export { router as transactionRateRouter }
