import { NextRequest, NextResponse } from 'next/server'
import { validateAdmin } from '@/lib/validateAdminSession'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
const MAX_SIZE = 20 * 1024 * 1024 // Increased to 20MB to match quote form limits

const s3Client = process.env.S3_ENDPOINT ? new S3Client({
  region: 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
}) : null;

export async function POST(req: NextRequest) {
  const authError = await validateAdmin(req)
  if (authError) return authError

  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type.' }, { status: 400 })
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large. Max 20MB.' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = file.name.split('.').pop() ?? 'jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  // Cloudflare R2 / AWS S3 Upload path
  if (s3Client && process.env.S3_BUCKET_NAME) {
    try {
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `portfolio/${filename}`,
        Body: buffer,
        ContentType: file.type,
      }))
      // Replace this with your actual public R2 bucket domain
      const url = `${process.env.S3_PUBLIC_DOMAIN || 'https://pub-domain.r2.dev'}/portfolio/${filename}`
      return NextResponse.json({ url })
    } catch (err: any) {
      console.error("S3 Upload Error:", err)
      return NextResponse.json({ error: "Failed to upload to S3" }, { status: 500 })
    }
  }

  // Fallback local filesystem (Warning: Volatile on Hostinger)
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'portfolio')
  await mkdir(uploadDir, { recursive: true })
  await writeFile(path.join(uploadDir, filename), buffer)

  const url = `/uploads/portfolio/${filename}`
  return NextResponse.json({ url })
}
