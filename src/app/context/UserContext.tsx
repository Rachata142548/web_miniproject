'use client'; // ให้ทำงานในฝั่ง Client

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  role: "Admin" | "Viewer";
}

const UserContext = createContext<{
  user: User;
  login: (user: User) => void;
  logout: () => void;
} | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ email: "", role: "Viewer" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();
        setUser({ email: data.email, role: data.role });
        console.log("Fetched User:", data); // Debug Log
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // ฟังก์ชัน login
  const login = (user: User) => {
    setUser(user);
  };

  // ฟังก์ชัน logout
  const logout = () => {
    setUser({ email: "", role: "Viewer" });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// นี่คือส่วนสำคัญที่ส่งออก useUser
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
