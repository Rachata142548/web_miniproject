import { NextApiRequest, NextApiResponse } from 'next';

// Mock database
let items: { id: number; name: string; price: number; imageUrl: string }[] = [
  { id: 1, name: 'Guitar', price: 20, imageUrl: '/images/item1.jpg' },
  { id: 2, name: 'Guitar', price: 30, imageUrl: '/images/item2.jpg' },
  { id: 3, name: 'Guitar', price: 50, imageUrl: '/images/item3.jpg' },
  { id: 4, name: 'Violin', price: 80, imageUrl: '/images/item4.jpg' },
  { id: 5, name: 'Drum'  , price: 100, imageUrl: '/images/item5.webp' },
];

// ฟังก์ชันเพื่อเช็คว่า user มี role เป็น admin หรือไม่
const checkAuthorization = (req: NextApiRequest): boolean => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token
  if (token !== 'Admin') {
    return false; // หากไม่ใช่ Admin ปฏิเสธการเข้าถึง
  }
  return true; // ถ้าเป็น Admin ให้ทำงานต่อ
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET: ดึงรายการทั้งหมด
  if (req.method === 'GET') {
    return res.status(200).json(items);
  }

  // ตรวจสอบ Authorization header สำหรับคำขอที่ไม่ใช่ GET
  if (!checkAuthorization(req)) {
    return res.status(403).json({ error: 'Forbidden: You do not have permission to perform this action' });
  }

  // POST: เพิ่มสินค้าหากได้รับข้อมูลครบถ้วน
  if (req.method === 'POST') {
    const { name, price, imageUrl } = req.body;

    if (!name || !price || !imageUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newItem = {
      id: items.length + 1,
      name,
      price: parseFloat(price), // Ensure price is a number
      imageUrl,
    };
    items.push(newItem);
    return res.status(201).json(newItem);
  }

  // DELETE: ลบสินค้าตาม ID ที่ส่งมา
  if (req.method === 'DELETE') {
    const { id } = req.query;

    // ตรวจสอบ id
    const itemId = parseInt(id as string, 10);
    if (isNaN(itemId)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }

    items = items.filter((item) => item.id !== itemId);
    return res.status(200).json({ message: 'Item deleted successfully' });
  }

  // PUT: แก้ไขข้อมูลสินค้าตาม ID
  if (req.method === 'PUT') {
    const { id, name, price, imageUrl } = req.body;
  
    if (!id || !name || !price || !imageUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
  
    items[index] = { id, name, price: parseFloat(price), imageUrl };
    return res.status(200).json(items[index]);
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}