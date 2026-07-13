import { db } from '../db'
import { imageStorage } from './imageStorage'

// Löscht ein Bild aus S3, sofern kein Angebot es mehr referenziert.
// Fehler brechen den Aufrufer nicht ab: die DB-Änderung ist dann schon durch.
export async function cleanupImage(ref: string): Promise<void> {
  try {
    const used = await db.offer.findFirst({ where: { imageRef: ref } })
    if (!used) {
      await imageStorage.delete(ref)
      await db.uploadedImage.deleteMany({ where: { ref } })
    }
  } catch (err) {
    console.error('Bild-Cleanup fehlgeschlagen:', ref, err)
  }
}
