import { NextRequest, NextResponse } from "next/server";
import { validateAdmin } from "@/lib/validateAdminSession";
import { BRAND_CONTEXT, geminiModel, generateText } from "@/lib/gemini";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req: NextRequest) {
  const authError = await validateAdmin(req);
  if (authError) return authError;

  try {
    const { imageUrl, context, locale } = await req.json();

    const promptText = `
You are writing image metadata for a website. Company: ${BRAND_CONTEXT}
This image is on the "${context}" section.
Generate metadata in ${locale === "ar" ? "Arabic" : "English"}.
Return ONLY valid raw JSON, no markdown fences:
{
  "altText": "...",
  "caption": "..."
}
Constraints:
- altText: under 125 chars, accessibility-focused, describes exactly what is in the image, no brand fluff
- caption: 1 sentence, brand-appropriate display caption explaining the significance
    `.trim();

    let resultTxt = "";

    try {
      // 1. Try resolving local file and using vision
      // imageUrl might be like /uploads/123.jpg or https://...
      // Only process if it is a local upload path.
      if (imageUrl.startsWith("/")) {
        const fullPath = path.join(process.cwd(), "public", imageUrl);
        const fileBuffer = await fs.readFile(fullPath);
        const base64Data = fileBuffer.toString("base64");
        // deduce mime
        const ext = path.extname(fullPath).toLowerCase();
        let mimeType = "image/jpeg";
        if (ext === ".png") mimeType = "image/png";
        if (ext === ".webp") mimeType = "image/webp";

        const result = await geminiModel.generateContent([
          {
            inlineData: {
              data: base64Data,
              mimeType,
            },
          },
          promptText,
        ]);
        resultTxt = result.response.text().trim();
      } else {
        // Fallback to text only if external URL
        resultTxt = await generateText(promptText + `\n\n(Note: The image URL is external: ${imageUrl}, base your description on the section context.)`);
      }
    } catch {
      // Fallback if local file read fails
      resultTxt = await generateText(promptText + `\n\n(Note: Image file could not be read, base your description entirely on the section context.)`);
    }

    const cleanJsonStr = resultTxt.replace(/^```json/m, '').replace(/```$/m, '').trim();
    let result;
    try {
      result = JSON.parse(cleanJsonStr);
    } catch {
      result = JSON.parse(cleanJsonStr.substring(cleanJsonStr.indexOf('{'), cleanJsonStr.lastIndexOf('}') + 1));
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("AI Image Meta Error:", error);
    return NextResponse.json({ error: "Failed to generate image meta" }, { status: 500 });
  }
}
