import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { db } from '../db'
import { requireAuth } from '../middleware/requireAuth'
import { validate } from '../middleware/validate'
import { AppError, ErrorCode } from '../errors'
import { imageStorage } from '../storage/imageStorage'

const router = Router()

const uploadImageSchema = z.object({
  image: z.string().min(1),
})

// Refs are always `offers/<uuid>.<ext>` — only the filename travels in the URL
const FILENAME_RE = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}\.(?:jpg|png|webp)$/

router.post(
  '/images',
  requireAuth,
  validate(uploadImageSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { image } = req.body as z.infer<typeof uploadImageSchema>
      const ref = await imageStorage.save(image)
      res.status(201).json({ filename: ref.replace(/^offers\//, ''), url: imageStorage.toUrl(ref) })
    } catch (err) {
      next(err)
    }
  },
)

router.delete(
  '/images/:filename',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!FILENAME_RE.test(req.params.filename)) {
        throw new AppError(ErrorCode.NOT_FOUND, 404)
      }
      const ref = `offers/${req.params.filename}`
      const used = await db.offer.findFirst({ where: { imageRef: ref } })
      if (used) {
        throw new AppError(ErrorCode.CONFLICT, 409, 'Das Bild wird von einem Angebot verwendet.')
      }
      await imageStorage.delete(ref)
      res.status(204).end()
    } catch (err) {
      next(err)
    }
  },
)

export { router as imagesRouter }
