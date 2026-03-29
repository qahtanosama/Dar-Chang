import { NextRequest, NextResponse } from "next/server";
import { validateAdmin } from "@/lib/validateAdminSession";
import { prisma } from "@/lib/prisma";
import { revalidatePublic } from "@/lib/revalidatePublic";

export async function GET(req: NextRequest) {
  const authError = await validateAdmin(req);
  if (authError) return authError;

  const settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  return NextResponse.json(settings ?? {});
}

export async function PUT(req: NextRequest) {
  const authError = await validateAdmin(req);
  if (authError) return authError;

  const body = await req.json();
  const { id, updatedAt, ...data } = body;

  const settings = await prisma.siteSettings.upsert({
    where: { id: "global" },
    update: data,
    create: { id: "global", ...data },
  });

  revalidatePublic();
  return NextResponse.json(settings);
}
