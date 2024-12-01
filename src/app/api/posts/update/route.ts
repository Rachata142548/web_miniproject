import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { id, title, content } = await req.json();

  if (!id || !title || !content) {
    return NextResponse.json(
      { error: "ID, title, and content are required" },
      { status: 400 }
    );
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}