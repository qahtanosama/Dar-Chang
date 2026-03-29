import { NextRequest, NextResponse } from "next/server";
import { validateAdmin } from "@/lib/validateAdminSession";
import { generateText, BRAND_CONTEXT, TONE_CONTEXT } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  const authError = await validateAdmin(req);
  if (authError) return authError;

  const { field, locale, context, existingContent } = await req.json();

  if (!context || context.trim().length < 3) {
    return NextResponse.json(
      { error: "Please provide a title or topic first before generating." },
      { status: 400 }
    );
  }

  const langLabel = locale === "ar" ? "Arabic (Modern Standard Arabic, business register)" : "English";

  const lengthRule =
    field === "body"
      ? "Write 4–6 well-structured paragraphs. Use headers (H2) to break up sections where appropriate."
      : field === "summary"
      ? "Write exactly 2–3 sentences. Be concise and informative."
      : "Write under 12 words. Make it clear and compelling.";

  const prompt = `
You are a professional content writer for the following company:
${BRAND_CONTEXT}

Tone guidance:
${TONE_CONTEXT}

Write a ${field} in ${langLabel} based on the following topic or title:
"${context}"

${existingContent ? `Here is existing content to improve upon:\n"${existingContent}"\n` : ""}

Writing rules:
- Write as a knowledgeable human expert would — natural, confident, clear
- NEVER use these phrases: "In today's world", "In today's fast-paced world", "Unlock", "Leverage", "Seamless", "Dive into", "Game-changer", "Cutting-edge", "Navigate", "Landscape", "Empower"
- Do not start with "I" or with the company name
- No filler sentences or padding
- ${lengthRule}
- Return ONLY the written content. No preamble, no explanation, no labels, no surrounding quotes.
`.trim();

  try {
    const result = await generateText(prompt);
    return NextResponse.json({ result });
  } catch (err) {
    console.error("Gemini write-content error:", err);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}
