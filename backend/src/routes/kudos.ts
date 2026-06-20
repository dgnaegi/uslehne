import { Router, Request, Response, NextFunction } from 'express'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'

const router = Router()

export async function recomputeBalance(userId: string): Promise<number> {
  const result = await db.kudoLedger.aggregate({
    where: { userId },
    _sum: { delta: true },
  })
  return result._sum.delta ?? 0
}

router.get(
  '/kudos/ledger',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = Math.min(parseInt(String(req.query.limit ?? '20'), 10), 100)
      const offset = parseInt(String(req.query.offset ?? '0'), 10)
      const entries = await db.kudoLedger.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      })
      const total = await db.kudoLedger.count({ where: { userId: req.user!.id } })
      res.json({ entries, total, limit, offset })
    } catch (err) {
      next(err)
    }
  },
)

export default router
