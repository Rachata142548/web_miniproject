// src/app/dashboard/manage-items/page.tsx
"use client";

import React, { useState } from "react";

export default function ManageItems() {
  const [items, setItems] = useState([{ id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }]);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    setItems((prevItems) => [...prevItems, { id: prevItems.length + 1, name: newItem }]);
    setNewItem(""); // เคลียร์ช่องกรอกหลังจากเพิ่ม
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEditItem = (id: number, newName: string) => {
    setItems(items.map(item => item.id === id ? { ...item, name: newName } : item));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Manage Items</h2>
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
          />
          <button
            className="w-full mt-2 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            onClick={handleAddItem}
            disabled={!newItem}
          >
            Add Item
          </button>
        </div>

        <ul>
          {items.map(item => (
            <li key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <div>
                <button
                  className="mr-2 text-yellow-500"
                  onClick={() => handleEditItem(item.id, prompt("Edit name:", item.name) || item.name)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
