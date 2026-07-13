import 'dotenv/config'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { imageStorage } from './storage/imageStorage'
import healthRouter from './routes/health'
import authRouter from './routes/auth'
import authSessionRouter from './routes/authSession'
import invitesRouter from './routes/invites'
import addressesRouter from './routes/addresses'
import { offersRouter } from './routes/offers'
import { imagesRouter } from './routes/images'
import { offersMutateRouter } from './routes/offersMutate'
import { transactionsRouter } from './routes/transactions'
import { transactionActionsRouter } from './routes/transactionActions'
import karmaRouter from './routes/kudos'
import { usersRouter } from './routes/users'
import { adminRouter } from './routes/admin'
import passwordResetRouter from './routes/authPasswordReset'
import bugReportRouter from './routes/bugReport'
import { errorHandler } from './middleware/errorHandler'

const app = express()
const port = process.env.PORT || 3001

app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(compression())

// Angebotsbilder liegen auf dem öffentlichen S3-Bucket.
const imageOrigin = new URL(imageStorage.toUrl('x')).origin
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        // styled-components injiziert Styles inline, daher unsafe-inline.
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        // blob: braucht die Bildvorschau/-verkleinerung beim Upload (createObjectURL).
        imgSrc: ["'self'", 'data:', 'blob:', imageOrigin],
        connectSrc: ["'self'"],
        frameAncestors: ["'none'"],
      },
    },
  }),
)

const WINDOW_MS = 15 * 60 * 1000
const globalLimiter = rateLimit({ windowMs: WINDOW_MS, max: 200 })
// Eine Instanz pro Endpoint: Fehlversuche werden je API separat gezählt.
// Erfolgreiche Requests zählen nicht ans Limit, nur 4xx/5xx (Brute-Force-Schutz
// ohne legitime Nutzer auszubremsen).
const failLimiter = () => rateLimit({ windowMs: WINDOW_MS, max: 20, skipSuccessfulRequests: true })
// check-email und forgot-password antworten bewusst immer 200, dort muss
// jeder Request zählen (Enumeration- bzw. Mail-Spam-Schutz).
const everyRequestLimiter = (max: number) => rateLimit({ windowMs: WINDOW_MS, max })

// Kein CORS: Frontend und API laufen same-origin (in dev über den Vite-Proxy).
// Cross-Origin-Zugriff auf die Cookie-Auth soll explizit nicht möglich sein.
app.use(cookieParser())
app.use(express.json({ limit: '3mb' }))
app.use('/api/', globalLimiter)
app.use('/api/v1/auth/login', failLimiter())
app.use('/api/v1/auth/register', failLimiter())
app.use('/api/v1/auth/reset-password', failLimiter())
app.use('/api/v1/auth/forgot-password', everyRequestLimiter(10))
app.use('/api/v1/auth/check-email', everyRequestLimiter(20))

app.use('/api/v1', healthRouter)
app.use('/api/v1', authRouter)
app.use('/api/v1', authSessionRouter)
app.use('/api/v1', invitesRouter)
app.use('/api/v1', addressesRouter)
app.use('/api/v1', offersRouter)
app.use('/api/v1', imagesRouter)
app.use('/api/v1', offersMutateRouter)
app.use('/api/v1', transactionsRouter)
app.use('/api/v1', transactionActionsRouter)
app.use('/api/v1', karmaRouter)
app.use('/api/v1', usersRouter)
app.use('/api/v1', adminRouter)
app.use('/api/v1', passwordResetRouter)
app.use('/api/v1', bugReportRouter)

if (process.env.NODE_ENV === 'production') {
  const staticDir = path.resolve(__dirname, '../../frontend/dist')
  app.use(express.static(staticDir))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(staticDir, 'index.html'))
  })
}

app.use(errorHandler)

const server = app.listen(port, () => {
  console.log(`uslehne API running on port ${port}`)
})

const shutdown = () => {
  server.close(() => process.exit(0))
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
