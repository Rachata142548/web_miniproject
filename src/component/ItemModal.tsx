// src/components/ItemModal.tsx
import React from 'react';

interface Item {
  name: string;
  imageUrl: string;
}

interface ItemModalProps {
  item: Item;
  onClose: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Item Details</h2>
        <div>
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-700">{item.name}</h3>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;