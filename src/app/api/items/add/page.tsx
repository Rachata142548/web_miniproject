"use client";

import { useState } from "react";

export default function AddItemPage() {
  const [name, setName] = useState("");

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Item added successfully!");
        setName(""); // เคลียร์ฟอร์มหลังจากเพิ่มข้อมูลสำเร็จ
      } else {
        alert(`Error: ${data.error || "Failed to add item"}`);
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      <form onSubmit={handleAddItem} className="w-1/3 bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Item Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}