import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, imageUrl } = body;

    if (!name || !imageUrl) {
      return NextResponse.json(
        { error: 'Name and Image URL are required!' },
        { status: 400 }
      );
    }

    // ตัวอย่าง: บันทึก item (ในฐานข้อมูล หรือไฟล์ JSON)
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join('public', 'items.json');

    const itemData = { name, imageUrl };
    fs.appendFileSync(filePath, JSON.stringify(itemData) + '\n');

    return NextResponse.json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to add item' },
      { status: 500 }
    );
  }
}
