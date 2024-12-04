import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password, role } = await req.json();

    // ตรวจสอบว่าอีเมลนี้มีผู้ใช้งานในระบบหรือยัง
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // เข้ารหัสรหัสผ่านก่อนบันทึกในฐานข้อมูล
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้างผู้ใช้งานใหม่
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'Viewer', // Default role เป็น Viewer หากไม่มีการระบุ
      },
    });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
