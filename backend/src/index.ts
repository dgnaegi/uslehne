import 'dotenv/config'
import path from 'path'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import healthRouter from './routes/health'
import authRouter from './routes/auth'
import invitesRouter from './routes/invites'
import addressesRouter from './routes/addresses'
import { offersRouter } from './routes/offers'
import { offersMutateRouter } from './routes/offersMutate'
import { transactionsRouter } from './routes/transactions'
import { transactionActionsRouter } from './routes/transactionActions'
import kudosRouter from './routes/kudos'
import { usersRouter } from './routes/users'
import { adminRouter } from './routes/admin'
import passwordResetRouter from './routes/authPasswordReset'
import bugReportRouter from './routes/bugReport'
import { errorHandler } from './middleware/errorHandler'

const app = express()
const port = process.env.PORT || 3001

app.set('trust proxy', 1)

const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 })
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 })

app.use(cors())
app.use(express.json({ limit: '3mb' }))
app.use('/api/', globalLimiter)
app.use('/api/v1/auth/login', authLimiter)
app.use('/api/v1/auth/register', authLimiter)
app.use('/api/v1/auth/password-reset', authLimiter)

app.use('/api/v1', healthRouter)
app.use('/api/v1', authRouter)
app.use('/api/v1', invitesRouter)
app.use('/api/v1', addressesRouter)
app.use('/api/v1', offersRouter)
app.use('/api/v1', offersMutateRouter)
app.use('/api/v1', transactionsRouter)
app.use('/api/v1', transactionActionsRouter)
app.use('/api/v1', kudosRouter)
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
