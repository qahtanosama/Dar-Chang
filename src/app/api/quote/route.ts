import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Only initialize Resend and Upstash if API keys are provided
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ratelimit = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) 
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 submissions per hour per IP
    }) 
  : null;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const quoteSchema = z.object({
  category: z.string().min(1).max(100),
  email: z.string().email(),
  quantity: z.string().min(1).max(100),
  message: z.string().max(3000).optional(),
  port: z.string().min(1).max(100),
}).passthrough(); // Allow dynamic contextual fields (e.g., scale, brands, capacity) to pass through intact

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    if (ratelimit) {
      const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
      const { success } = await ratelimit.limit(ip);
      
      if (!success) {
        console.warn(`Rate limit exceeded for IP: ${ip}`);
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
    }

    // 2. Body Parsing & Zod Validation
    const body = await req.json();
    const parsed = quoteSchema.parse(body); // Throws if invalid payload
    
    // Deconstruct core and passthrough fields
    const { category, email, quantity, message, port, ...otherFields } = parsed;

    // 3. Fallback dev mode check
    if (!resend) {
      console.warn("RESEND_API_KEY not set. Mocking validated email submission for development.");
      console.warn("Mock Validated Payload:", JSON.stringify({ category, email, port, quantity }));
      prisma.formSubmission.create({
        data: { type: 'quote', email, category: category ?? '', message: message ?? '', data: JSON.stringify(otherFields) },
      }).catch(() => {})
      return NextResponse.json({ success: true, mock: true });
    }

    // 4. Dispatch Email
    const htmlContent = `
      <h2>New Quote Request (Dar Chang)</h2>
      <p><strong>Category:</strong> ${escapeHtml(category)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Quantity:</strong> ${escapeHtml(quantity)}</p>
      <p><strong>Destination Port:</strong> ${escapeHtml(port)}</p>
      <br/>
      <h3>Additional Details (Contextual):</h3>
      <pre>${escapeHtml(JSON.stringify(otherFields, null, 2))}</pre>
      <br/>
      <h3>Message/Requirements:</h3>
      <p>${message ? escapeHtml(message) : 'No additional message provided.'}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Dar Chang Team <quotes@darchangglobal.com>', // Usually needs verified domain on Resend
      to: ['info@darchangglobal.com'], // The team email that receives leads
      subject: `New Quote Request: ${category || 'General'}`,
      html: htmlContent,
      replyTo: email,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Save to DB (fire-and-forget — don't block response)
    prisma.formSubmission.create({
      data: {
        type: 'quote',
        email,
        category: category ?? '',
        message: message ?? '',
        data: JSON.stringify(otherFields),
      },
    }).catch((e) => console.error('[submissions] DB save failed:', e))

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.warn("Zod Validation Failed:", error.flatten());
      return NextResponse.json({ error: 'Invalid or incomplete form input data.' }, { status: 400 });
    }
    console.error("Internal Server Error processing quote:", error);
    return NextResponse.json({ error: 'Failed to submit quote' }, { status: 500 });
  }
}
