import { NextResponse } from "next/server";
import prisma from "@/utils/prisma"; // เรียกใช้ Prisma Client

export async function POST(req: Request) {
  try {
    console.log("Request received for POST /api/items");

    // อ่านข้อมูลจาก Request Body
    const body = await req.json();
    console.log("Request body:", body);

    const { name } = body;

    // ตรวจสอบว่าชื่อ (name) ถูกส่งมาหรือไม่
    if (!name) {
      console.warn("Validation failed: Missing 'name' in request body");
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    // สร้างรายการใหม่ในฐานข้อมูล
    const newItem = await prisma.item.create({
      data: { name },
    });

    // แสดงข้อมูลที่เพิ่มสำเร็จใน log
    console.log("Item added successfully:", newItem);
    return NextResponse.json(newItem);
  } catch (error) {
    // แสดงข้อผิดพลาดใน log
    console.error("Error adding item:", error);
    return NextResponse.json(
      { error: "Failed to add item" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log("Fetching items...");

    const items = await prisma.item.findMany();
    console.log("Fetched items:", items);

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
