import jwt from 'jsonwebtoken'
import { Role } from '@prisma/client'

function resolveSecret(): string {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be set in production')
  }
  return 'dev-secret-change-me'
}

const SECRET = resolveSecret()
const EXPIRES_IN = '90d'

export interface JwtPayload {
  sub: string
  role: Role
  // Token-Version des Users zum Zeitpunkt der Ausstellung. Ein Passwort-Reset
  // erhöht die Version und macht damit alle älteren Tokens ungültig.
  tv?: number
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN })
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload
}
