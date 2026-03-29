import { NextRequest, NextResponse } from "next/server";
import { validateAdmin } from "@/lib/validateAdminSession";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

const s3Client = process.env.S3_ENDPOINT
  ? new S3Client({
      region: "auto",
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
      },
    })
  : null;

export async function POST(req: NextRequest) {
  const authError = await validateAdmin(req);
  if (authError) return authError;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const assetKey = formData.get("assetKey") as string | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!assetKey) {
    return NextResponse.json({ error: "No assetKey provided" }, { status: 400 });
  }

  const isVideo = assetKey === "heroVideo";
  const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
    "image/x-icon",
    "image/vnd.microsoft.icon", // extra mime for .ico
  ];
  const allowedVideoTypes = ["video/mp4", "video/webm"];
  const allowedTypes = isVideo ? allowedVideoTypes : allowedImageTypes;

  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type." }, { status: 400 });
  }

  if (file.size > maxSize) {
    return NextResponse.json(
      { error: `File too large. Max ${isVideo ? "50MB" : "5MB"}.` },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split(".").pop() ?? (isVideo ? "mp4" : "jpg");
  const filename = `${assetKey}-${Date.now()}.${ext}`;

  let url = "";

  if (s3Client && process.env.S3_BUCKET_NAME) {
    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: `assets/${filename}`,
          Body: buffer,
          ContentType: file.type,
        })
      );
      url = `${process.env.S3_PUBLIC_DOMAIN || "https://pub-domain.r2.dev"}/assets/${filename}`;
    } catch (err: any) {
      console.error("S3 Upload Error:", err);
      return NextResponse.json({ error: "Failed to upload to S3" }, { status: 500 });
    }
  } else {
    const uploadDir = path.join(process.cwd(), "public", "uploads", "assets");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);
    url = `/uploads/assets/${filename}`;
  }

  try {
    const dbField = `${assetKey}Url`;
    await prisma.siteSettings.update({
      where: { id: "global" },
      data: { [dbField]: url },
    });
  } catch (err) {
    console.error("DB update error:", err);
    return NextResponse.json(
      { error: "Upload succeeded but failed to save to Database." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url });
}
