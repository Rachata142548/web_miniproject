"use client"; // บอกให้ไฟล์นี้ทำงานใน Client-Side

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  role: "Admin" | "Viewer";
}

const UserContext = createContext<User | undefined>(undefined);

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

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
