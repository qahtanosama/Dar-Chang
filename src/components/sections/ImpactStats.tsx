// Server Component wrapper — fetches stats from DB, falls back to hardcoded values
import { prisma } from '@/lib/prisma'
import { ImpactStatsClient } from './ImpactStatsClient'

const FALLBACK_STATS = [
  { id: 'f1', labelEn: 'Containers Processed', labelAr: 'حاوية تم شحنها', value: '450', suffix: '+', order: 0 },
  { id: 'f2', labelEn: 'Global Clients', labelAr: 'عميل حول العالم', value: '17', suffix: '', order: 1 },
  { id: 'f3', labelEn: 'Countries Reached', labelAr: 'دولة تم الوصول إليها', value: '13', suffix: '', order: 2 },
  { id: 'f4', labelEn: 'Years of Expertise', labelAr: 'سنوات من الخبرة', value: '3', suffix: '+', order: 3 },
]

export type StatData = typeof FALLBACK_STATS[0]

export async function ImpactStats() {
  const dbStats = await prisma.impactStat.findMany({ orderBy: { order: 'asc' } })
  const stats: StatData[] = dbStats.length > 0 ? dbStats : FALLBACK_STATS
  return <ImpactStatsClient stats={stats} />
}
