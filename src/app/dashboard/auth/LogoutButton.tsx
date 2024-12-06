"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";  // นำเข้า useUser
import { useState } from "react";

const LogoutButton = () => {
  const { logout } = useUser(); // เข้าถึงฟังก์ชัน logout จาก context
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout(); // เรียกใช้งาน logout
      router.push("/login"); // เปลี่ยนเส้นทางไปหน้า login
    } catch (error) {
      console.log("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;