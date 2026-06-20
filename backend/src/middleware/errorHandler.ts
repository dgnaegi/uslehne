import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { AppError, ErrorCode } from '../errors'

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.status).json({ error: { code: err.code, message: err.message } })
    return
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        code: ErrorCode.VALIDATION_ERROR,
        message: 'Ungültige Eingabe.',
        fields: err.flatten().fieldErrors,
      },
    })
    return
  }

  console.error(err)
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Interner Serverfehler.' } })
}
