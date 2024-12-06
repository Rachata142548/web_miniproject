"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation"; // Use for navigation

const ManageItems = () => {
  const { role, user, logout } = useUser(); // Get role, user, and logout from Context
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter(); // Use router for navigation

  // Form states for adding items
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemImageUrl, setNewItemImageUrl] = useState("");

  // Editing item states
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Add new item
  const handleAdd = async () => {
    if (!newItemName || !newItemPrice || !newItemImageUrl) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newItemName,
          price: newItemPrice,
          imageUrl: newItemImageUrl,
        }),
      });

      if (response.ok) {
        const newItem = await response.json();
        setItems((prev) => [...prev, newItem]);
        setMessage("Item added successfully!");
        setNewItemName("");
        setNewItemPrice("");
        setNewItemImageUrl("");
      } else {
        setMessage("Failed to add item.");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      setMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Save edits to an item
  const handleSaveEdit = async () => {
    if (!editingItem || !editingItemId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingItem),
      });

      if (response.ok) {
        setItems((prev) =>
          prev.map((item) => (item.id === editingItemId ? editingItem : item))
        );
        setMessage("Item updated successfully!");
        setEditingItemId(null);
        setEditingItem(null);
      } else {
        setMessage("Failed to update item.");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      setMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Edit an item
  const handleEdit = (item: any) => {
    setEditingItemId(item.id);
    setEditingItem({ ...item });
  };

  // Delete an item
  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/items?id=${id}`, { method: "DELETE" });

      if (response.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        setMessage("Item deleted successfully!");
      } else {
        setMessage("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    logout(); // Call logout from context
    router.push("/dashboard/auth/login"); // Navigate to login page
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Welcome! Music Store</h1>

      {message && (
        <div className="text-center mb-6 text-lg font-semibold text-green-500">
          {message}
        </div>
      )}

      {/* Welcome message */}
      <div className="text-center mb-6 text-black">
        {user ? (
          <p className="text-xl">
            {role === "Admin" ? `Welcome, Admin (${user.email})` : `Welcome, ${user.email}`}
          </p>
        ) : (
          <p className="text-xl text-red-500">Please log in to continue.</p>
        )}
      </div>

      {/* Logout Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Add Item Form */}
      <div className="mb-6 text-center">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Item Name"
          className="mb-4 p-2 border rounded-lg text-black"
        />
        <input
          type="text"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
          placeholder="Price"
          className="mb-4 p-2 border rounded-lg text-black"
        />
        <input
          type="text"
          value={newItemImageUrl}
          onChange={(e) => setNewItemImageUrl(e.target.value)}
          placeholder="Image URL"
          className="mb-4 p-2 border rounded-lg text-black"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add New Item"}
        </button>
      </div>

      {/* Display Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-black">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300"
          >
            {editingItemId === item.id ? (
              <>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  className="mb-4 p-2 border rounded-lg text-black"
                />
                <input
                  type="text"
                  value={editingItem.price}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, price: e.target.value })
                  }
                  className="mb-4 p-2 border rounded-lg text-black"
                />
                <input
                  type="text"
                  value={editingItem.imageUrl}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, imageUrl: e.target.value })
                  }
                  className="mb-4 p-2 border rounded-lg text-black"
                />
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                  disabled={loading}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingItemId(null)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ml-4"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-lg text-gray-700">${item.price}</p>
                <div className="mt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageItems;