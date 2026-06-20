import { Router, Request, Response } from 'express'
import prisma from '../db'

const router = Router()

router.get('/items', async (_req: Request, res: Response) => {
  const items = await prisma.item.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(items)
})

router.get('/items/:id', async (req: Request, res: Response) => {
  const item = await prisma.item.findUnique({ where: { id: Number(req.params.id) } })
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
})

router.post('/items', async (req: Request, res: Response) => {
  const { title, description } = req.body as { title: string; description?: string }
  if (!title) return res.status(400).json({ error: 'title is required' })
  const item = await prisma.item.create({ data: { title, description } })
  res.status(201).json(item)
})

router.delete('/items/:id', async (req: Request, res: Response) => {
  await prisma.item.delete({ where: { id: Number(req.params.id) } })
  res.status(204).send()
})

export default router
