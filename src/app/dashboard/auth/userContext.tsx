// src/app/dashboard/auth/userContext.tsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserContextType {
  user: any; // ข้อมูลผู้ใช้
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any>(null); // เก็บข้อมูลผู้ใช้
  const router = useRouter();

  // ฟังก์ชันสำหรับ login
  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setUser(data.user);
      localStorage.setItem('userToken', JSON.stringify(data.user)); // เก็บข้อมูลผู้ใช้ใน localStorage
      router.push('/dashboard/manage-items'); // เปลี่ยนเส้นทางไปหน้า Dashboard
    }
  };

  // ฟังก์ชันสำหรับ logout
  const logout = async () => {
    setUser(null);
    localStorage.removeItem('userToken');
    router.push('/login'); // เปลี่ยนเส้นทางไปหน้า Login
  };

  useEffect(() => {
    // ตรวจสอบ localStorage สำหรับการล็อกอินอัตโนมัติ
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setUser(JSON.parse(userToken));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};