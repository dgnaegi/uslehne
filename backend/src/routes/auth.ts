import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { db } from '../db'
import { hashPassword, verifyPassword } from '../auth/password'
import { signToken } from '../auth/jwt'
import { requireAuth } from '../middleware/requireAuth'
import { validate } from '../middleware/validate'
import { AppError, ErrorCode } from '../errors'
import { ADMIN_USERNAMES } from '../config/admins'

const router = Router()

const OPEN_INVITE_CODE = 'Free4All'
const OPEN_INVITE_KUDOS = 20

const registerSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, 'Nur Buchstaben, Zahlen und _ erlaubt.'),
  email: z.string().email(),
  password: z.string().min(8),
  inviteCode: z.string().min(1),
})

const loginSchema = z.object({
  login: z.string().min(1),
  password: z.string().min(1),
})

router.post('/auth/check-email', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body as { email?: string }
    if (!email) { res.json({ exists: false }); return }
    const user = await db.user.findUnique({ where: { email } })
    res.json({ exists: Boolean(user) })
  } catch (err) {
    next(err)
  }
})

router.post(
  '/auth/register',
  validate(registerSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password, inviteCode } = req.body as z.infer<typeof registerSchema>

      const isOpen = inviteCode === MASTER_INVITE_CODE
      let kudosAmount = MASTER_INVITE_KUDOS
      let inviteId: string | null = null

      if (!isOpen) {
        const invite = await db.invite.findUnique({ where: { code: inviteCode } })
        if (!invite) throw new AppError(ErrorCode.INVITE_NOT_FOUND, 404)
        if (invite.usedById !== null) throw new AppError(ErrorCode.INVITE_ALREADY_USED, 409)
        kudosAmount = invite.kudos
        inviteId = invite.id
      }

      const [existingEmail, existingUsername] = await Promise.all([
        db.user.findUnique({ where: { email } }),
        db.user.findUnique({ where: { username } }),
      ])
      if (existingEmail) throw new AppError(ErrorCode.CONFLICT, 409, 'E-Mail bereits vergeben.')
      if (existingUsername) throw new AppError(ErrorCode.CONFLICT, 409, 'Benutzername bereits vergeben.')

      const passwordHash = await hashPassword(password)

      const user = await db.$transaction(async (tx: Prisma.TransactionClient) => {
        const newUser = await tx.user.create({
          data: {
            username,
            email,
            passwordHash,
            kudosBalance: kudosAmount,
            role: ADMIN_USERNAMES.includes(username) ? 'ADMIN' : 'USER',
          },
        })
        if (inviteId) {
          await tx.invite.update({
            where: { id: inviteId },
            data: { usedById: newUser.id, usedAt: new Date() },
          })
        }
        await tx.kudoLedger.create({
          data: { userId: newUser.id, delta: kudosAmount, reason: 'INVITE_BONUS' },
        })
        return newUser
      })

      const token = signToken({ sub: user.id, role: user.role })
      res.status(201).json({
        token,
        user: { id: user.id, username: user.username, email: user.email, kudosBalance: user.kudosBalance },
      })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/auth/login',
  validate(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { login, password } = req.body as z.infer<typeof loginSchema>
      const user = await db.user.findFirst({
        where: { OR: [{ email: login }, { username: login }] },
      })
      if (!user) throw new AppError(ErrorCode.INVALID_CREDENTIALS, 401)
      const valid = await verifyPassword(password, user.passwordHash)
      if (!valid) throw new AppError(ErrorCode.INVALID_CREDENTIALS, 401)
      const token = signToken({ sub: user.id, role: user.role })
      res.json({
        token,
        user: { id: user.id, username: user.username, email: user.email, kudosBalance: user.kudosBalance },
      })
    } catch (err) {
      next(err)
    }
  },
)

router.get('/auth/me', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await db.user.findUniqueOrThrow({
      where: { id: req.user!.id },
      select: { id: true, username: true, email: true, role: true, kudosBalance: true, createdAt: true },
    })
    res.json({ user })
  } catch (err) {
    next(err)
  }
})

export default router
