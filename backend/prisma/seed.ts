import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.item.createMany({
    data: [
      { title: 'Erster Eintrag', description: 'Das ist ein Demo-Eintrag.' },
      { title: 'Zweiter Eintrag', description: 'Noch ein Demo-Eintrag.' },
      { title: 'Dritter Eintrag', description: 'Und noch einer.' },
    ],
    skipDuplicates: true,
  })
  console.log('Seed complete.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
