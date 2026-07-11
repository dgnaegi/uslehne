import { Router, Request, Response, NextFunction } from 'express'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import { AppError, ErrorCode } from '../errors'

const router = Router()

router.get('/users/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isSelf = req.params.id === req.user!.id

    const user = await db.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        username: true,
        karmaBalance: true,
        createdAt: true,
        ratingsReceived: { select: { stars: true } },
      },
    })
    if (!user) throw new AppError(ErrorCode.NOT_FOUND, 404)

    const [offersGiven, offersTaken, karmaHistory] = await Promise.all([
      db.transaction.count({
        where: {
          ownerId: user.id,
          type: 'GIVE',
          status: { in: ['ACCEPTED', 'COMPLETED'] },
        },
      }),
      db.transaction.count({
        where: {
          requesterId: user.id,
          status: { in: ['ACCEPTED', 'RETURNED', 'COMPLETED'] },
        },
      }),
      isSelf
        ? db.karmaLedger.findMany({
            where: { userId: user.id },
            select: { id: true, delta: true, reason: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
            take: 30,
          })
        : Promise.resolve(undefined),
    ])

    const stars = user.ratingsReceived.map((r) => r.stars)
    const avgStars =
      stars.length > 0
        ? Math.round((stars.reduce((a, b) => a + b, 0) / stars.length) * 10) / 10
        : null

    res.json({
      user: {
        id: user.id,
        username: user.username,
        karmaBalance: user.karmaBalance,
        createdAt: user.createdAt,
        avgStars,
        ratingCount: stars.length,
        offersGiven,
        offersTaken,
        ...(karmaHistory !== undefined ? { karmaHistory } : {}),
      },
    })
  } catch (err) {
    next(err)
  }
})

export { router as usersRouter }
