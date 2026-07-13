import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../auth/jwt'
import { AUTH_COOKIE } from '../auth/cookie'
import { db } from '../db'
import { AppError, ErrorCode } from '../errors'

const SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']

function extractToken(req: Request): { token: string; fromCookie: boolean } | null {
  const cookieToken = (req.cookies as Record<string, string> | undefined)?.[AUTH_COOKIE]
  if (cookieToken) return { token: cookieToken, fromCookie: true }
  // Bearer-Fallback für den Übergang von localStorage auf Cookie.
  const header = req.headers.authorization
  if (header?.startsWith('Bearer ')) return { token: header.slice(7), fromCookie: false }
  return null
}

export async function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const extracted = extractToken(req)
  if (!extracted) {
    return next(new AppError(ErrorCode.UNAUTHORIZED, 401))
  }
  // CSRF-Schutz (zusätzlich zu SameSite=Lax): Cookies sendet der Browser
  // automatisch, darum verlangen schreibende Requests mit Cookie-Auth einen
  // JSON-Content-Type. Den kann ein Cross-Site-Formular nicht setzen.
  if (
    extracted.fromCookie &&
    !SAFE_METHODS.includes(req.method) &&
    !req.headers['content-type']?.includes('application/json')
  ) {
    return next(new AppError(ErrorCode.FORBIDDEN, 403))
  }
  try {
    const payload = verifyToken(extracted.token)
    const user = await db.user.findUnique({
      where: { id: payload.sub },
      select: { role: true, tokenVersion: true },
    })
    // Tokens von vor der Einführung von tv zählen als Version 0.
    if (!user || user.tokenVersion !== (payload.tv ?? 0)) {
      return next(new AppError(ErrorCode.UNAUTHORIZED, 401))
    }
    req.user = { id: payload.sub, role: user.role }
    next()
  } catch {
    next(new AppError(ErrorCode.UNAUTHORIZED, 401))
  }
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction): void {
  if (req.user?.role !== 'ADMIN') {
    return next(new AppError(ErrorCode.FORBIDDEN, 403))
  }
  next()
}
