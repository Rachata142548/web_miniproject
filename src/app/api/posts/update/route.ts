import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function PUT(req: NextRequest) {
  try {
    const { id, title, content } = await req.json();

    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
