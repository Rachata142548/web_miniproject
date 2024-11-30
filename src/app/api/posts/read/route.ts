// src/app/api/posts/read/route.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}
