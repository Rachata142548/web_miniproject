// src/app/api/posts/delete/route.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const post = await prisma.post.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Post deleted successfully", post });
}
