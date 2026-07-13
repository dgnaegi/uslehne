import { Response } from 'express'

export const AUTH_COOKIE = 'auth_token'

// 90 Tage, muss zur EXPIRES_IN des JWT passen.
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000

// httpOnly: für JS unlesbar (XSS kann den Token nicht exfiltrieren).
// SameSite=Lax: Browser sendet das Cookie nicht bei Cross-Site-POSTs (CSRF-Schutz).
// Secure nur in Production, damit der Vite-Dev-Proxy über http funktioniert.
export function setAuthCookie(res: Response, token: string): void {
  res.cookie(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE_MS,
    path: '/',
  })
}

export function clearAuthCookie(res: Response): void {
  res.clearCookie(AUTH_COOKIE, { path: '/' })
}
