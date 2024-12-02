'use client';

import { useState } from 'react';
import Form from '@/component/Form';

const ManageItemsPage = () => {
  const [formData, setFormData] = useState({ name: '', imageUrl: '' });
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const handleAddItem = async (data: { name: string; imageUrl: string }) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      if (!data.name || !data.imageUrl) {
        throw new Error('Name and Image URL are required!');
      }
      const itemData = { name: data.name, imageUrl: data.imageUrl };
      if (editingIndex === null) {
        setItems([...items, itemData]);
      } else {
        const updatedItems = [...items];
        updatedItems[editingIndex] = itemData;
        setItems(updatedItems);
        setEditingIndex(null);
      }
      setFormData({ name: '', imageUrl: '' });
    } catch (error: any) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleEditItem = (index: number) => {
    setFormData({
      name: items[index].name,
      imageUrl: items[index].imageUrl,
    });
    setEditingIndex(index);
  };

  const handleImageClick = (item: any) => {
    setSelectedItem(item); 
  };

  const handleCloseModal = () => {
    setSelectedItem(null); 
  };

  return (
    <div className="container mx-auto p-6 bg-cover bg-no-repeat bg-center rounded-lg shadow-lg max-w-3xl text-black">
      <h1 className="text-3xl font-semibold text-center mb-8 text-white">Manage Items</h1>

      <Form onSubmit={handleAddItem} />

      <div className="mt-8 space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Items List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-700">{item.name}</h3>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-40 h-40 mt-2 rounded-lg shadow-md cursor-pointer"
                onClick={() => handleImageClick(item)} 
              />
              <div className="space-x-3 mt-4">
                <button
                  onClick={() => handleEditItem(index)}
                  className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Item Details</h2>
            <div>
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700">{selectedItem.name}</h3>
              <p className="text-gray-600 mt-2">Here you can add any additional information about this item.</p>
              <button
                onClick={handleCloseModal}
                className="mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 

export default ManageItemsPage;