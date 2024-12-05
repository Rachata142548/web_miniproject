export async function DELETE(request: Request) {
  try {
    // อ่านข้อมูลจาก body
    const body = await request.text(); // ใช้ text() แทน json() เพื่อดูข้อความทั้งหมดใน body

    console.log('Request body:', body); // ตรวจสอบว่า body ถูกส่งมาไหม

    if (!body) {
      return new Response(
        JSON.stringify({ error: 'Request body is empty' }),
        { status: 400 }
      );
    }

    // แปลงข้อมูลจาก body เป็น JSON
    const { id } = JSON.parse(body);

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'ID is required' }),
        { status: 400 }
      );
    }

    // ตัวอย่างข้อมูลรายการสินค้า
    const items = [
      { id: 1, name: 'Item 1', price: 100 },
      { id: 2, name: 'Item 2', price: 150 },
      { id: 3, name: 'Item 3', price: 200 },
    ];

    // ค้นหาว่ามี item ที่มี id ตรงกับที่ส่งมาหรือไม่
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return new Response(
        JSON.stringify({ error: 'Item not found' }),
        { status: 404 }
      );
    }

    // ลบ item ที่ตรงกับ id
    items.splice(itemIndex, 1);

    // ส่งผลลัพธ์ที่สำเร็จ
    return new Response(
      JSON.stringify({ success: true, message: 'Item deleted' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error); // แสดงข้อผิดพลาดใน console
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { status: 500 }
    );
  }
}
