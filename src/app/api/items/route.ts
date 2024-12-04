// src/app/api/items/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const items = [
    {
      id: 1,
      name: 'Item 1',
      price: '$20',
      imageUrl: '/images/item1.jpeg', // ตั้งค่าภาพให้ถูกต้อง
    },
    {
      id: 2,
      name: 'Item 2',
      price: '$30',
      imageUrl: '/images/item2.jpg', // ตั้งค่าภาพให้ถูกต้อง
    },
  ];

  return NextResponse.json(items);
}
