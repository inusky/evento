import { PrismaClient } from '~~/app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

interface GlobalWithPrisma {
  prisma?: PrismaClient;
}

const globalForPrisma = globalThis as unknown as GlobalWithPrisma;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    }),
    log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
