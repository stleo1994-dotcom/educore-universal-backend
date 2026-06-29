import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const role = await prisma.userRole.create({
    data: {
      userId: 'cmqy7sd6600012qeb7ji8oyd0',
      role: 'PLATFORM_ADMIN',
    },
  });
  console.log('Created role:', role);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
