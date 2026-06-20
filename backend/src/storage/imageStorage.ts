export interface ImageStorage {
  save(input: string): Promise<string>
  toUrl(ref: string): string
}

const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_BYTES = 2 * 1024 * 1024 // 2 MB

class Base64ImageStorage implements ImageStorage {
  async save(input: string): Promise<string> {
    const match = input.match(/^data:([^;]+);base64,(.+)$/)
    if (!match) throw new Error('Ungültiges Bildformat.')

    const [, mime, data] = match
    if (!ALLOWED_MIMES.includes(mime)) {
      throw new Error(`Ungültiger Bildtyp. Erlaubt: ${ALLOWED_MIMES.join(', ')}.`)
    }

    const byteLength = Buffer.byteLength(data, 'base64')
    if (byteLength > MAX_BYTES) {
      throw new Error('Bild ist zu gross (max. 2 MB).')
    }

    return input
  }

  toUrl(ref: string): string {
    return ref
  }
}

export const imageStorage: ImageStorage = new Base64ImageStorage()
