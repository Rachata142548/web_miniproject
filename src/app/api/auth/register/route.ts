// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/utils/db'; 

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  // ตรวจสอบว่ามีผู้ใช้งานที่มีอีเมลนี้อยู่หรือไม่
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ message: 'ผู้ใช้งานนี้มีอยู่แล้ว' }, { status: 400 });
  }

  // ทำการเข้ารหัสรหัสผ่านก่อนที่จะเก็บในฐานข้อมูล
  const hashedPassword = await bcrypt.hash(password, 10);

  // สร้างผู้ใช้งานในฐานข้อมูล
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role || 'Viewer', // กำหนดบทบาทเริ่มต้นเป็น 'Viewer'
    },
  });

  return NextResponse.json({ message: 'สร้างผู้ใช้งานสำเร็จ' }, { status: 201 });
}
