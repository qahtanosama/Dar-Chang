import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Always cache on globalThis — prevents multiple clients in both dev (HMR) and
// production (PM2 workers share the same module cache per worker process).
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
globalForPrisma.prisma = prisma
