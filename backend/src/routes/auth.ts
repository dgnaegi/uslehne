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

const ALLOWED_CITIES = ['zürich', 'zurich']

function isZurich(city: string): boolean {
  return ALLOWED_CITIES.includes(city.trim().toLowerCase())
}

const registerSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, 'Nur Buchstaben, Zahlen und _ erlaubt.'),
  email: z.string().email(),
  password: z.string().min(8),
  inviteCode: z.string().min(1),
  address: z.object({
    street: z.string().min(1),
    zip: z.string().min(1),
    city: z.string().min(1),
    label: z.string().optional(),
  }),
})

const loginSchema = z.object({
  login: z.string().min(1),
  password: z.string().min(1),
})

router.post(
  '/auth/register',
  validate(registerSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password, inviteCode, address } = req.body as z.infer<
        typeof registerSchema
      >

      if (!isZurich(address.city)) {
        throw new AppError(ErrorCode.ADDRESS_CITY_NOT_ALLOWED, 422)
      }

      const invite = await db.invite.findUnique({ where: { code: inviteCode } })
      if (!invite) throw new AppError(ErrorCode.INVITE_NOT_FOUND, 404)
      if (invite.usedById !== null) throw new AppError(ErrorCode.INVITE_ALREADY_USED, 409)

      const [existingEmail, existingUsername] = await Promise.all([
        db.user.findUnique({ where: { email } }),
        db.user.findUnique({ where: { username } }),
      ])
      if (existingEmail) throw new AppError(ErrorCode.CONFLICT, 409, 'E-Mail bereits vergeben.')
      if (existingUsername)
        throw new AppError(ErrorCode.CONFLICT, 409, 'Benutzername bereits vergeben.')

      const passwordHash = await hashPassword(password)

      const user = await db.$transaction(async (tx: Prisma.TransactionClient) => {
        const newUser = await tx.user.create({
          data: {
            username,
            email,
            passwordHash,
            kudosBalance: invite.kudos,
            role: ADMIN_USERNAMES.includes(username) ? 'ADMIN' : 'USER',
          },
        })

        await tx.address.create({
          data: {
            userId: newUser.id,
            street: address.street,
            zip: address.zip,
            city: address.city.trim(),
            label: address.label,
          },
        })

        await tx.invite.update({
          where: { id: invite.id },
          data: { usedById: newUser.id, usedAt: new Date() },
        })

        await tx.kudoLedger.create({
          data: {
            userId: newUser.id,
            delta: invite.kudos,
            reason: 'INVITE_BONUS',
          },
        })

        return newUser
      })

      const token = signToken({ sub: user.id, role: user.role })
      res.status(201).json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          kudosBalance: user.kudosBalance,
        },
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
        where: {
          OR: [{ email: login }, { username: login }],
        },
      })

      if (!user) throw new AppError(ErrorCode.INVALID_CREDENTIALS, 401)

      const valid = await verifyPassword(password, user.passwordHash)
      if (!valid) throw new AppError(ErrorCode.INVALID_CREDENTIALS, 401)

      const token = signToken({ sub: user.id, role: user.role })
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          kudosBalance: user.kudosBalance,
        },
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
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        kudosBalance: true,
        createdAt: true,
      },
    })
    res.json({ user })
  } catch (err) {
    next(err)
  }
})

export default router
