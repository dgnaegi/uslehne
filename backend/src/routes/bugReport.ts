import { Router } from 'express'
import { requireAuth } from '../middleware/requireAuth'
import { sendMailSilent } from '../services/mail'
import { db } from '../db'
import { AppError, ErrorCode } from '../errors'

const router = Router()

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

router.post('/bug-report', requireAuth, async (req, res, next) => {
  try {
    const { message } = req.body as { message?: string }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return next(new AppError(ErrorCode.VALIDATION_ERROR, 400))
    }

    const user = await db.user.findUnique({
      where: { id: req.user!.id },
      select: { email: true, username: true },
    })

    sendMailSilent({
      to: 'daniel.gnaegi@outlook.com',
      subject: `[uslehne] Bug-Meldung von ${user?.username ?? req.user!.id}`,
      html: `
        <p><strong>Benutzer:</strong> ${user?.username ?? 'unbekannt'} (${user?.email ?? req.user!.id})</p>
        <p><strong>Beschreibung:</strong></p>
        <p>${escapeHtml(message.trim()).replace(/\n/g, '<br>')}</p>
      `,
    })

    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router
