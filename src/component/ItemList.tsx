// src/components/ItemList.tsx
import React from 'react';

interface Item {
  name: string;
  imageUrl: string;
}

interface ItemListProps {
  items: Item[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onImageClick: (item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onEdit, onDelete, onImageClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-gray-700">{item.name}</h3>
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-40 h-40 mt-2 rounded-lg shadow-md cursor-pointer"
            onClick={() => onImageClick(item)}
          />
          <div className="space-x-3 mt-4">
            <button
              onClick={() => onEdit(index)}
              className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(index)}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;