/**
 * Erstellt einen Admin-Invite mit Wunschcode (z.B. für Flyer).
 *
 *   npx tsx scripts/create-invite.ts <code> [karma]
 *   npx tsx scripts/create-invite.ts Free4All 20
 *
 * Der Invite gehört dem ersten ADMIN-User. Existiert der Code schon,
 * wird nichts überschrieben.
 */
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  const code = process.argv[2]
  const karma = Number(process.argv[3] ?? 20)

  if (!code || Number.isNaN(karma)) {
    console.error('Usage: npx tsx scripts/create-invite.ts <code> [karma]')
    process.exit(1)
  }

  const admin = await prisma.user.findFirst({ where: { role: Role.ADMIN } })
  if (!admin) {
    console.error('Kein ADMIN-User in der Datenbank. Zuerst npm run db:seed ausführen.')
    process.exit(1)
  }

  const existing = await prisma.invite.findUnique({ where: { code } })
  if (existing) {
    const status = existing.usedById ? 'bereits eingelöst' : 'noch offen'
    console.log(`Invite «${code}» existiert schon (${status}, ${existing.karma} Karma).`)
    return
  }

  const invite = await prisma.invite.create({
    data: { code, createdById: admin.id, karma },
  })
  console.log(
    `Invite erstellt: ${invite.code} (${invite.karma} Karma, Ersteller: ${admin.username})`,
  )
  console.log(`Link: https://uslehne.ch/register?invite=${invite.code}`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
