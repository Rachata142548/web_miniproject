"use client"; // ใช้ client-side rendering

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation"; // ใช้ router จาก next/navigation

const ManageItems = () => {
  const { role } = useUser(); // ดึง role จาก Context
  const [items, setItems] = useState<any[]>([]);
  const router = useRouter(); // ใช้ router จาก next/navigation
  const [loading, setLoading] = useState(false); // สถานะการโหลด

  // สถานะสำหรับฟอร์มการเพิ่มสินค้า
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemImageUrl, setNewItemImageUrl] = useState("");

  // สถานะสำหรับการแสดงข้อความ
  const [message, setMessage] = useState<string | null>(null);

  // ดึงรายการสินค้าจาก API
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

  // ฟังก์ชันสำหรับการเพิ่มสินค้า
  const handleAdd = async () => {
    if (!newItemName || !newItemPrice || !newItemImageUrl) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
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
      // รีเซ็ตฟอร์มหลังจากเพิ่ม
      setNewItemName("");
      setNewItemPrice("");
      setNewItemImageUrl("");
    } else {
      setMessage("Failed to add item.");
    }
    setLoading(false);
  };

  // ฟังก์ชันสำหรับการลบสินค้า
  const handleDelete = async (id: number) => {
    setLoading(true);
    const response = await fetch(`/api/items?id=${id}`, { method: "DELETE" });

    if (response.ok) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setMessage("Item deleted successfully!");
    } else {
      setMessage("Failed to delete item.");
    }
    setLoading(false);
  };

  // ฟังก์ชันสำหรับการแก้ไขสินค้า
  const handleEdit = (id: number) => {
    console.log("Edit item:", id);
    router.push(`/edit-item/${id}`); // นำทางไปยังหน้าการแก้ไขสินค้า
  };

  // ฟังก์ชันสำหรับการดูรายละเอียด
  const handleViewDetails = (id: number) => {
    router.push(`/item-details/${id}`); // นำทางไปยังหน้ารายละเอียดสินค้า
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Manage Items</h1>

      {/* แสดงข้อความ */}
      {message && (
        <div className="text-center mb-6 text-lg font-semibold text-green-500">
          {message}
        </div>
      )}

      {/* ฟอร์ม Add สำหรับ Admin */}
      {role === "Admin" && (
        <div className="mb-6 text-center">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Item Name"
            className="mb-4 p-2 border rounded-lg"
          />
          <input
            type="text"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
            placeholder="Price"
            className="mb-4 p-2 border rounded-lg"
          />
          <input
            type="text"
            value={newItemImageUrl}
            onChange={(e) => setNewItemImageUrl(e.target.value)}
            placeholder="Image URL"
            className="mb-4 p-2 border rounded-lg"
          />
          <div className="text-center">
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              disabled={loading} // ปิดการใช้งานปุ่มเมื่อกำลังโหลด
            >
              {loading ? "Adding..." : "Add New Item"}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="bg-white border rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
            <p className="text-lg text-gray-700">{item.price}</p>

            <div className="mt-4">
              {role === "Admin" ? (
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                    disabled={loading} // ปิดการใช้งานปุ่มเมื่อกำลังโหลด
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    disabled={loading} // ปิดการใช้งานปุ่มเมื่อกำลังโหลด
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleViewDetails(item.id)}
                  className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 transition duration-300"
                  disabled={loading} // ปิดการใช้งานปุ่มเมื่อกำลังโหลด
                >
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageItems;