import { NextRequest, NextResponse } from "next/server";
import { validateAdmin } from "@/lib/validateAdminSession";
import { BRAND_CONTEXT, generateText } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const authError = await validateAdmin(req);
  if (authError) return authError;

  try {
    const { pageKey, locale } = await req.json();
    let pageContent = "";

    // Assemble server-side context
    if (pageKey === "home") {
      const services = await prisma.service.findMany({ take: 3, orderBy: { order: "asc" } });
      const stats = await prisma.impactStat.findMany({ take: 3, orderBy: { order: "asc" } });
      const svcStr = services.map(s => locale === "ar" ? s.titleAr : s.titleEn).join(", ");
      const statStr = stats.map(s => `${s.value}${s.suffix} ${locale === "ar" ? s.labelAr : s.labelEn}`).join(", ");
      pageContent = `Core services: ${svcStr}. Key metrics: ${statStr}.`;
    } else if (pageKey === "portfolio") {
      const items = await prisma.portfolioItem.findMany({ take: 5, orderBy: { order: "asc" } });
      pageContent = `Recent projects: ${items.map(i => `${locale === "ar" ? i.titleAr : i.titleEn} (${i.category})`).join(", ")}`;
    } else if (pageKey === "insights") {
      const insights = await prisma.insight.findMany({ where: { published: true }, take: 5, orderBy: { publishedAt: "desc" } });
      pageContent = `Recent news/insights: ${insights.map(i => locale === "ar" ? i.titleAr : i.titleEn).join(", ")}`;
    } else if (pageKey === "services") {
      const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
      pageContent = `All services: ${services.map(s => locale === "ar" ? s.titleAr : s.titleEn).join(", ")}`;
    } else {
      pageContent = `Section: ${pageKey}`;
    }

    const prompt = `
You are an SEO specialist for: ${BRAND_CONTEXT}

Generate SEO metadata in ${locale === "ar" ? "Arabic" : "English"} for the "${pageKey}" page.

Page content/context:
"${pageContent}"

Return ONLY a valid JSON object — no markdown fences, no explanation, no backticks. It must be strictly parsable by JSON.parse():
{
  "metaTitle": "...",
  "metaDescription": "...",
  "ogTitle": "...",
  "ogDescription": "..."
}

Rules:
- metaTitle: max 60 chars, must end with " | Dar Chang" (EN) or " | دار تشانغ" (AR)
- metaDescription: max 155 chars, action-oriented, no keyword stuffing
- ogTitle: can be more creative than metaTitle
- ogDescription: 1–2 sentences, engaging for social sharing
- No keyword stuffing
- Sound like a real company, not a robot
- Output ONLY valid raw JSON syntax.
    `.trim();

    const resultTxt = await generateText(prompt);
    // Remove markdown fences if it still output them
    const cleanJsonStr = resultTxt.replace(/^```json/m, '').replace(/```$/m, '').trim();
    
    let result;
    try {
      result = JSON.parse(cleanJsonStr);
    } catch {
      result = JSON.parse(cleanJsonStr.substring(cleanJsonStr.indexOf('{'), cleanJsonStr.lastIndexOf('}') + 1));
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("AI SEO Generate Error:", error);
    return NextResponse.json({ error: "Failed to generate SEO" }, { status: 500 });
  }
}
