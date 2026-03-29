import { prisma } from '@/lib/prisma'

export async function fireWebhook(payload: object): Promise<void> {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'global' },
      select: { webhookUrl: true },
    })
    const url = settings?.webhookUrl
    if (!url) return
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    console.error('[webhook] failed:', err)
  }
}
