import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    email: "admin@example.com",
    role: "Admin", // เปลี่ยนเป็น "Viewer" หากต้องการทดสอบ
  });
}