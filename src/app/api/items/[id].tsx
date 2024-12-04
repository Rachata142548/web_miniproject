// src/app/item/[id].tsx
import { useRouter } from 'next/router';

export default function ItemDetail() {
  const router = useRouter();
  const { id } = router.query;

  // สำหรับตัวอย่างนี้จะใช้ id เป็นเพียงตัวแปร
  return (
    <div>
      <h1>Item Details</h1>
      <p>Item ID: {id}</p>
      {/* คุณสามารถดึงข้อมูลจาก API หรือฐานข้อมูลมาแสดงที่นี่ */}
    </div>
  );
}
