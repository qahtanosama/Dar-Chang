import { NextRequest, NextResponse } from "next/server";
import { validateAdmin } from "@/lib/validateAdminSession";
import { generateText, TONE_CONTEXT } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  const authError = await validateAdmin(req);
  if (authError) return authError;

  const { text, from, to, fieldType } = await req.json();

  if (!text || text.trim().length < 2) {
    return NextResponse.json(
      { error: "Nothing to translate — please write content first." },
      { status: 400 }
    );
  }

  const fromLabel = from === "en" ? "English" : "Arabic";
  const toLabel = to === "en" ? "English" : "Arabic (Modern Standard Arabic, business register)";

  const prompt = `
Translate the following ${fieldType} from ${fromLabel} to ${toLabel}.

Tone guidance (apply to ${toLabel} output):
${TONE_CONTEXT}

Text to translate:
"${text}"

Translation rules:
- Natural, fluent translation — not word-for-word literal
- Preserve the original meaning, tone, and structure exactly
- For titles: keep concise and punchy
- For body text: preserve all paragraph breaks and heading structure
- Return ONLY the translated text. No preamble, no explanation, no surrounding quotes.
`.trim();

  try {
    const result = await generateText(prompt);
    return NextResponse.json({ result });
  } catch (err) {
    console.error("Gemini translate error:", err);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
