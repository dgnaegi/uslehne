import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../auth/jwt'
import { AppError, ErrorCode } from '../errors'

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return next(new AppError(ErrorCode.UNAUTHORIZED, 401))
  }
  try {
    const payload = verifyToken(header.slice(7))
    req.user = { id: payload.sub, role: payload.role }
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
