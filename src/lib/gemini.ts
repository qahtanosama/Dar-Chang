import { GoogleGenerativeAI } from "@google/generative-ai";

// Brand context injected into every prompt
const BRAND_CONTEXT = "Dar Chang is a premier B2B sourcing and import-export operation based in Shanghai. We act as a strategic bridge between high-quality Asian manufacturers and global clients in the Middle East, Russia, and Europe.";

const TONE_CONTEXT = "The tone should be professional, minimalist, and premium. Avoid 'fluff' or marketing cliches. Use clear, grounded language that builds trust with B2B clients in the Middle East and Europe. When translating to Arabic, use a modern, formal business dialect make it more human writing.";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing from environment variables");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function generateText(prompt: string): Promise<string> {
  const result = await geminiModel.generateContent(prompt);
  return result.response.text().trim();
}

export { BRAND_CONTEXT, TONE_CONTEXT };
