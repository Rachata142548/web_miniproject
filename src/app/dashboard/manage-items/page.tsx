'use client';

import { useEffect, useState } from 'react';

const ManageItems = ({ userRole }: { userRole: string }) => {
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', imageUrl: '' });

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleAdd = async () => {
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      const item = await response.json();
      setItems((prev) => [...prev, item]);
      setNewItem({ name: '', price: '', imageUrl: '' });
    } else {
      console.error('Failed to add item');
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/items?id=${id}`, { method: 'DELETE' });

    if (response.ok) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      console.error('Failed to delete item');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Items</h1>

      {userRole === 'Admin' && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newItem.imageUrl}
            onChange={(e) =>
              setNewItem({ ...newItem, imageUrl: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2">
            Add Item
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border p-4">
            <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover mb-4" />
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p>Price: ${item.price}</p>

            {userRole === 'Admin' ? (
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => console.log('Edit item:', item.id)}
                  className="bg-green-500 text-white px-4 py-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-4 py-2"
                >
                  Delete
                </button>
              </div>
            ) : (
              <button
                onClick={() => console.log('View details:', item.id)}
                className="bg-blue-500 text-white px-4 py-2 mt-4"
              >
                View Details
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageItems;