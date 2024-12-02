// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // ลบข้อมูลที่เก็บใน cookies เช่น Token หรือ Session
    // ตัวอย่างการลบ cookies โดยใช้ Next.js
    const res = NextResponse.json({ message: 'Logged out successfully' });

    // กำหนดค่า cookie ให้เป็นค่าว่างหรือหมดอายุ
    res.cookies.set('auth_token', '', { expires: new Date(0) });

    return res;
  } catch (error) {
    return NextResponse.json({ message: 'Logout failed', error: error.message }, { status: 500 });
  }
}