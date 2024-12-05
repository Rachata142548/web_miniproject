// src/app/dashboard/manage-items/[id].tsx

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const EditItem = () => {
  const router = useRouter();
  const { id } = router.query; // รับค่า id จาก URL
  const [item, setItem] = useState<any>(null);

  // ดึงข้อมูลไอเทมจาก API
  useEffect(() => {
    if (id) {
      fetch(`/api/items/${id}`)
        .then((response) => response.json())
        .then((data) => setItem(data))
        .catch((error) => console.error('Error fetching item:', error));
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedItem = { ...item };

    fetch(`/api/items`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Item updated:', data);
        // อาจจะทำการ redirect ไปยังหน้าหลักหลังจากอัปเดต
      })
      .catch((error) => console.error('Error updating item:', error));
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Item</h1>
      <label>
        Name:
        <input
          type="text"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
        />
      </label>
      <br />
      <label>
        Image URL:
        <input
          type="text"
          value={item.imageUrl}
          onChange={(e) => setItem({ ...item, imageUrl: e.target.value })}
        />
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditItem;