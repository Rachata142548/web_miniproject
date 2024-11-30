// src/app/api/posts/create/route.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request: Request) {
  const { title, content } = await request.json();

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
    },
  });

  return NextResponse.json({ message: "Post created successfully", post });
}
