import 'dotenv/config'
import path from 'path'
import express from 'express'
import cors from 'cors'
import healthRouter from './routes/health'
import itemsRouter from './routes/items'
import { errorHandler } from './middleware/errorHandler'

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/v1', healthRouter)
app.use('/api/v1', itemsRouter)

if (process.env.NODE_ENV === 'production') {
  const staticDir = path.resolve(__dirname, '../../frontend/dist')
  app.use(express.static(staticDir))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(staticDir, 'index.html'))
  })
}

app.use(errorHandler)

app.listen(port, () => {
  console.log(`uslehne API running on port ${port}`)
})
