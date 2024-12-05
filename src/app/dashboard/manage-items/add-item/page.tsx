'use client'

import { useState } from 'react';

export default function AddItem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddItem = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !price || !imageUrl) {
      alert('All fields are required');
      return;
    }

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, imageUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const newItem = await response.json();
      alert('Item added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding item');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
      <form onSubmit={handleAddItem} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium  text-black">Item Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Item Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Add Item
        </button>
      </form>
    </div>
  );
}