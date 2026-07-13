import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../auth/jwt'
import { db } from '../db'
import { AppError, ErrorCode } from '../errors'

export async function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return next(new AppError(ErrorCode.UNAUTHORIZED, 401))
  }
  try {
    const payload = verifyToken(header.slice(7))
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
