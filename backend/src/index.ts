import 'dotenv/config'
import path from 'path'
import express from 'express'
import cors from 'cors'
import healthRouter from './routes/health'
import authRouter from './routes/auth'
import invitesRouter from './routes/invites'
import { errorHandler } from './middleware/errorHandler'

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '3mb' }))

app.use('/api/v1', healthRouter)
app.use('/api/v1', authRouter)
app.use('/api/v1', invitesRouter)

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
