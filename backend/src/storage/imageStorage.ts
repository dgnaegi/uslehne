import { randomUUID } from 'crypto'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export interface ImageStorage {
  save(input: string): Promise<string>
  toUrl(ref: string): string
}

const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_BYTES = 2 * 1024 * 1024 // 2 MB

const EXT_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

function parseDataUrl(input: string): { mime: string; buffer: Buffer } {
  const match = input.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) throw new Error('Ungültiges Bildformat.')

  const [, mime, data] = match
  if (!ALLOWED_MIMES.includes(mime)) {
    throw new Error(`Ungültiger Bildtyp. Erlaubt: ${ALLOWED_MIMES.join(', ')}.`)
  }

  const buffer = Buffer.from(data, 'base64')
  if (buffer.byteLength > MAX_BYTES) {
    throw new Error('Bild ist zu gross (max. 2 MB).')
  }

  return { mime, buffer }
}

interface S3Config {
  endpoint: string
  region: string
  bucket: string
  accessKeyId: string
  secretAccessKey: string
}

class S3ImageStorage implements ImageStorage {
  private client: S3Client
  private bucket: string
  private publicBase: string

  constructor(config: S3Config) {
    this.client = new S3Client({
      endpoint: config.endpoint,
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    })
    this.bucket = config.bucket
    this.publicBase = `https://${config.bucket}.${new URL(config.endpoint).host}`
  }

  async save(input: string): Promise<string> {
    // Editing without changing the image sends the public URL back — keep the existing key.
    if (input.startsWith(`${this.publicBase}/`)) {
      return input.slice(this.publicBase.length + 1)
    }

    const { mime, buffer } = parseDataUrl(input)
    const key = `offers/${randomUUID()}.${EXT_BY_MIME[mime]}`
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: mime,
        ACL: 'public-read',
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    )
    return key
  }

  toUrl(ref: string): string {
    return `${this.publicBase}/${ref}`
  }
}

function createImageStorage(): ImageStorage {
  const { S3_ENDPOINT, S3_REGION, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY } = process.env

  if (!S3_ENDPOINT || !S3_REGION || !S3_BUCKET || !S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY) {
    throw new Error(
      'Image storage not configured: S3_ENDPOINT, S3_REGION, S3_BUCKET, S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY must be set.',
    )
  }

  return new S3ImageStorage({
    endpoint: S3_ENDPOINT,
    region: S3_REGION,
    bucket: S3_BUCKET,
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  })
}

export const imageStorage: ImageStorage = createImageStorage()

export function withImageUrl<T extends { imageRef: string }>(offer: T): T {
  return { ...offer, imageRef: imageStorage.toUrl(offer.imageRef) }
}
