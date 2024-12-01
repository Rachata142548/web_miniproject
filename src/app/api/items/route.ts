// src/app/api/items/route.ts

import { NextResponse } from "next";
import { prisma } from "../../utils/prisma"; // หรือใช้ฐานข้อมูลที่คุณเชื่อมต่อ

export async function GET() {
  const items = await prisma.item.findMany();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const { name } = await req.json();
  const newItem = await prisma.item.create({
    data: { name },
  });
  return NextResponse.json(newItem);
}

export async function PUT(req: Request) {
  const { id, name } = await req.json();
  const updatedItem = await prisma.item.update({
    where: { id },
    data: { name },
  });
  return NextResponse.json(updatedItem);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const deletedItem = await prisma.item.delete({
    where: { id },
  });
  return NextResponse.json(deletedItem);
}
