import React, { useState } from 'react';

interface FormProps {
  onSubmit: (formData: { name: string; imageUrl: string }) => void;  // กำหนดประเภทของ props
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', imageUrl: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);  // เรียกใช้ฟังก์ชันที่ส่งมา
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md mb-8">
      <div>
        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Item Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Enter item name"
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-lg font-medium text-gray-700">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter image URL"
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md"
      >
        Add Item
      </button>
    </form>
  );
};

export default Form;