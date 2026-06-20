import { Router, Request, Response, NextFunction } from 'express'
import { randomBytes } from 'crypto'
import { z } from 'zod'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import { validate } from '../middleware/validate'
import { AppError, ErrorCode } from '../errors'

const router = Router()

const USER_INVITE_LIMIT = 3

router.get('/invites', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invites = await db.invite.findMany({
      where: { createdById: req.user!.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        code: true,
        kudos: true,
        usedAt: true,
        usedById: true,
        createdAt: true,
      },
    })
    res.json({ invites })
  } catch (err) {
    next(err)
  }
})

router.post(
  '/invites',
  requireAuth,
  validate(z.object({})),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id
      const role = req.user!.role

      if (role !== 'ADMIN') {
        const count = await db.invite.count({ where: { createdById: userId } })
        if (count >= USER_INVITE_LIMIT) {
          throw new AppError(ErrorCode.INVITE_LIMIT_REACHED, 403)
        }
      }

      const code = randomBytes(8).toString('hex')
      const invite = await db.invite.create({
        data: { code, createdById: userId, kudos: 10 },
        select: { id: true, code: true, kudos: true, createdAt: true },
      })
      res.status(201).json({ invite })
    } catch (err) {
      next(err)
    }
  },
)

router.get('/invites/:code', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const invite = await db.invite.findUnique({
      where: { code: req.params.code },
      select: { id: true, kudos: true, usedById: true },
    })
    const valid = !!invite && invite.usedById === null
    res.json({ valid, kudos: invite?.kudos ?? null })
  } catch (err) {
    next(err)
  }
})

export default router
