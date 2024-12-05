'use client'; // ใช้บอกว่าไฟล์นี้เป็นไฟล์ที่ทำงานในฝั่ง Client

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext'; // นำเข้า useUser สำหรับการล็อกอิน
import Link from 'next/link'; // สำหรับลิงก์ไปยังหน้าลงทะเบียน

const LoginPage = () => {
  const router = useRouter();
  const { login } = useUser(); // ใช้ฟังก์ชัน login จาก context
  const [name, setName] = useState(''); // เพิ่ม state สำหรับชื่อ
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }), // ส่งข้อมูลชื่อไปพร้อมกับอีเมลและรหัสผ่าน
    });

    const data = await response.json();

    if (response.ok) {
      login(data.user); // login ผู้ใช้หลังจากได้รับข้อมูล
      console.log('Login successful, redirecting...');
      router.push('/dashboard/manage-items'); // เปลี่ยนเส้นทางไปหน้า dashboard
    } else {
      console.log('Login failed');
      setError(data.message); // แสดงข้อความผิดพลาด
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-500">Login</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)} // แก้ไขค่าของ name
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-blue-500">
          <p>Don't have an account? <Link href="/dashboard/auth/register" className="text-blue-500">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;