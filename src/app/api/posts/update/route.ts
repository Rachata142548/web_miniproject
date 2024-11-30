// src/app/api/posts/update/route.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function PATCH(request: Request) {
  const { id, title, content } = await request.json();

  if (!id || !title || !content) {
    return NextResponse.json({ error: "ID, title, and content are required" }, { status: 400 });
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
    },
  });

  return NextResponse.json({ message: "Post updated successfully", post });
}
