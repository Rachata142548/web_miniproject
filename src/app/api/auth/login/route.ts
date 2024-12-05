// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/utils/db';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // ค้นหาผู้ใช้งานตามอีเมล
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ message: 'ไม่พบผู้ใช้งาน' }, { status: 404 });
  }

  // เปรียบเทียบรหัสผ่าน
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ message: 'รหัสผ่านไม่ถูกต้อง' }, { status: 401 });
  }

  // สร้าง JWT token
  const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return NextResponse.json({ message: 'เข้าสู่ระบบสำเร็จ', token }, { status: 200 });
}