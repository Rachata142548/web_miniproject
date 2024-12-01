// src/app/api/auth/register/route.ts

import bcrypt from "bcryptjs"; // สำหรับการ Hash รหัสผ่าน
import { NextResponse } from "next/server"; // สำหรับการส่ง response
import prisma from "@/utils/prisma"; // ใช้ Prisma เชื่อมต่อฐานข้อมูล

// ฟังก์ชัน POST ที่จะทำงานเมื่อมีการส่งข้อมูลสมัครสมาชิก
export async function POST(req: Request) {
  try {
    // ดึงข้อมูลจาก request body
    const { email, password } = await req.json();

    // ตรวจสอบว่า email หรือ password ว่างหรือไม่
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // ตรวจสอบว่า email นี้มีอยู่ในฐานข้อมูลแล้วหรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 400 }
      );
    }

    // Hash รหัสผ่านก่อนเก็บ
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // ส่ง response กลับไปว่าได้สมัครสมาชิกสำเร็จ
    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    // หากเกิดข้อผิดพลาดในกระบวนการ
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
