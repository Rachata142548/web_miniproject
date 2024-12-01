import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/db";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // ตรวจสอบข้อมูลที่ได้รับ
    console.log("Email received:", email);
    console.log("Hashed password:", hashedPassword);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log("Created User:", newUser);

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}