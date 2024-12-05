import { NextResponse } from 'next/server';

// Mock database (ควรเปลี่ยนเป็นการใช้ฐานข้อมูลจริงในภายหลัง)
let items = [
  {
    id: 1,
    name: 'Guitar',
    price: '$19999',
    imageUrl: '/images/item1.jpeg',
  },
  {
    id: 2,
    name: 'Rock Guitar',
    price: '$29999',
    imageUrl: '/images/item2.jpg',
  },
  {
    id: 3,
    name: 'Guitar Accoustices',
    price: '$5990',
    imageUrl: '/images/item3.jpg',
  },
  {
    id: 4,
    name: 'Violeen',
    price: '$30000',
    imageUrl: '/images/item4.avif',
  },
  {
    id: 5,
    name: 'Drum',
    price: '$25000',
    imageUrl: '/images/item5.webp',
  }
];

// GET: ดึงข้อมูลสินค้าทั้งหมด
export async function GET() {
  return NextResponse.json(items);
}

// POST: เพิ่มสินค้ารายการใหม่
export async function POST(request: Request) {
  try {
    const newItem = await request.json();

    if (!newItem.name || !newItem.price || !newItem.imageUrl) {
      return NextResponse.json(
        { message: 'ข้อมูลของสินค้าทั้งหมด (name, price, imageUrl) ต้องมี' },
        { status: 400 }
      );
    }

    // เพิ่ม item ใหม่
    newItem.id = items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;
    items.push(newItem);

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดขณะเพิ่มสินค้า', error: error.message },
      { status: 500 }
    );
  }
}

// PUT: แก้ไขข้อมูลของสินค้า
export async function PUT(request: Request) {
  try {
    const { id, name, price, imageUrl } = await request.json();

    if (!id || !name || !price || !imageUrl) {
      return NextResponse.json(
        { message: 'ข้อมูลทั้งหมด (id, name, price, imageUrl) ต้องมี' },
        { status: 400 }
      );
    }

    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      return NextResponse.json({ message: 'ไม่พบสินค้าที่ต้องการแก้ไข' }, { status: 404 });
    }

    // แก้ไขข้อมูลของสินค้า
    items[itemIndex] = { id, name, price, imageUrl };
    return NextResponse.json(items[itemIndex]);
  } catch (error) {
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดขณะแก้ไขสินค้า', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: ลบสินค้า
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get('id') || '', 10);

    if (isNaN(id)) {
      return NextResponse.json({ message: 'กรุณาระบุ ID ที่ถูกต้อง' }, { status: 400 });
    }

    const itemIndex = items.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      return NextResponse.json({ message: 'ไม่พบสินค้าที่ต้องการลบ' }, { status: 404 });
    }

    // ลบสินค้า
    items.splice(itemIndex, 1);
    return NextResponse.json({ message: 'สินค้าถูกลบแล้ว' });
  } catch (error) {
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดขณะลบสินค้า', error: error.message },
      { status: 500 }
    );
  }
}