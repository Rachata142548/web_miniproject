import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server'; // นำเข้า NextResponse

const prisma = new PrismaClient();

// เปลี่ยนจากการใช้งาน res เป็น NextResponse
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // ค้นหาผู้ใช้ในฐานข้อมูล
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
