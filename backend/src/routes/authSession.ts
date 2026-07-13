import { Router, Request, Response, NextFunction } from 'express'
import { db } from '../db'
import { signToken } from '../auth/jwt'
import { setAuthCookie, clearAuthCookie } from '../auth/cookie'
import { requireAuth } from '../middleware/requireAuth'
import { AppError, ErrorCode } from '../errors'

const router = Router()

// POST /auth/session
// Übergang von localStorage auf Cookie: nimmt einen noch gültigen
// Bearer-Token entgegen und stellt dafür ein frisches httpOnly-Cookie aus.
router.post(
  '/auth/session',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await db.user.findUnique({
        where: { id: req.user!.id },
        select: { id: true, role: true, tokenVersion: true },
      })
      if (!user) throw new AppError(ErrorCode.UNAUTHORIZED, 401)
      setAuthCookie(res, signToken({ sub: user.id, role: user.role, tv: user.tokenVersion }))
      res.json({ ok: true })
    } catch (err) {
      next(err)
    }
  },
)

// POST /auth/logout
// Kein requireAuth: Ausloggen soll auch mit abgelaufenem Token funktionieren.
router.post('/auth/logout', (_req: Request, res: Response) => {
  clearAuthCookie(res)
  res.json({ ok: true })
})

export default router
