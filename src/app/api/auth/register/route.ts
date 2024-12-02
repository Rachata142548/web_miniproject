import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// สร้างฟังก์ชัน POST แบบ named export
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // ตรวจสอบว่ามีผู้ใช้งานที่มี email นี้แล้วหรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // เข้ารหัส password
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้างผู้ใช้งานใหม่
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
