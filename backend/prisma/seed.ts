import { PrismaClient, Role, OfferType } from '@prisma/client'
import { randomBytes } from 'crypto'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

function generateCode(): string {
  return randomBytes(8).toString('hex')
}

async function main() {
  const adminHash = await bcrypt.hash('admin1234', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@uslehne.ch' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@uslehne.ch',
      passwordHash: adminHash,
      role: Role.ADMIN,
      kudosBalance: 999,
    },
  })

  const adminAddress = await prisma.address.upsert({
    where: { id: 'seed-admin-address' },
    update: {},
    create: {
      id: 'seed-admin-address',
      userId: admin.id,
      label: 'Büro',
      street: 'Bahnhofstrasse 1',
      zip: '8001',
      city: 'Zürich',
    },
  })

  for (let i = 1; i <= 5; i++) {
    await prisma.invite.upsert({
      where: { id: `seed-invite-${i}` },
      update: {},
      create: {
        id: `seed-invite-${i}`,
        code: generateCode(),
        createdById: admin.id,
        kudos: 20,
      },
    })
  }

  const demoUserHash = await bcrypt.hash('demo1234', 12)
  const demo = await prisma.user.upsert({
    where: { email: 'demo@uslehne.ch' },
    update: {},
    create: {
      username: 'demo',
      email: 'demo@uslehne.ch',
      passwordHash: demoUserHash,
      role: Role.USER,
      kudosBalance: 20,
    },
  })

  const demoAddress = await prisma.address.upsert({
    where: { id: 'seed-demo-address' },
    update: {},
    create: {
      id: 'seed-demo-address',
      userId: demo.id,
      label: 'Zuhause',
      street: 'Langstrasse 42',
      zip: '8004',
      city: 'Zürich',
    },
  })

  const PLACEHOLDER_IMAGE =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTkiPkJlaXNwaWVsYmlsZDwvdGV4dD48L3N2Zz4='

  const offers = [
    {
      id: 'seed-offer-1',
      title: 'Bohrmaschine',
      description: 'Bosch Schlagbohrmaschine, 750W, inkl. Zubehör.',
      type: OfferType.LEND,
    },
    {
      id: 'seed-offer-2',
      title: 'Kuchenform-Set',
      description: '5-teiliges Set, kaum benutzt.',
      type: OfferType.GIVE,
    },
    {
      id: 'seed-offer-3',
      title: 'Campingstuhl',
      description: 'Leichter Klappstuhl, ideal für Festivals.',
      type: OfferType.LEND,
    },
  ]

  for (const offer of offers) {
    await prisma.offer.upsert({
      where: { id: offer.id },
      update: {},
      create: {
        id: offer.id,
        ownerId: demo.id,
        title: offer.title,
        description: offer.description,
        type: offer.type,
        imageRef: PLACEHOLDER_IMAGE,
        addressId: demoAddress.id,
      },
    })
  }

  console.log(`Seed complete. Admin: ${admin.email}, Demo: ${demo.email}`)
  console.log(`Admin address: ${adminAddress.city}, Demo address: ${demoAddress.city}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
