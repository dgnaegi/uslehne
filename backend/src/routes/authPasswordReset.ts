import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import crypto from 'crypto'
import { db } from '../db'
import { hashPassword } from '../auth/password'
import { validate } from '../middleware/validate'
import { AppError, ErrorCode } from '../errors'
import { sendMail } from '../services/mail'
import { passwordResetMail } from '../services/mailTemplates'

const router = Router()

const TOKEN_TTL_MS = 60 * 60 * 1000 // 1 hour

function hashToken(raw: string): string {
  return crypto.createHash('sha256').update(raw).digest('hex')
}

const forgotSchema = z.object({ email: z.string().email() })

const resetSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
})

// POST /auth/forgot-password
// Always returns 200 — never reveals whether the email exists.
router.post(
  '/auth/forgot-password',
  validate(forgotSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body as z.infer<typeof forgotSchema>
      const user = await db.user.findUnique({ where: { email } })

      if (user) {
        await db.passwordResetToken.deleteMany({ where: { userId: user.id } })

        const rawToken = crypto.randomBytes(32).toString('hex')
        await db.passwordResetToken.create({
          data: {
            userId: user.id,
            tokenHash: hashToken(rawToken),
            expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
          },
        })

        const { subject, html } = passwordResetMail({ username: user.username, token: rawToken })
        await sendMail({ to: user.email, subject, html })
      }

      res.json({ ok: true })
    } catch (err) {
      next(err)
    }
  },
)

// POST /auth/reset-password
router.post(
  '/auth/reset-password',
  validate(resetSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, password } = req.body as z.infer<typeof resetSchema>
      const tokenHash = hashToken(token)

      const record = await db.passwordResetToken.findUnique({ where: { tokenHash } })
      if (!record || record.usedAt !== null) {
        throw new AppError(ErrorCode.RESET_TOKEN_INVALID, 400)
      }
      if (record.expiresAt < new Date()) {
        throw new AppError(ErrorCode.RESET_TOKEN_EXPIRED, 400)
      }

      const passwordHash = await hashPassword(password)
      await db.$transaction([
        db.user.update({ where: { id: record.userId }, data: { passwordHash } }),
        db.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
      ])

      res.json({ ok: true })
    } catch (err) {
      next(err)
    }
  },
)

export default router
