'use client'; // Indicating this is a client-side component

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser({ email: "", role: "Viewer" }); // Reset user state on logout
    // Optionally clear any user-related data from local storage or cookies here
    console.log("User logged out");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();
        setUser({ email: data.email, role: data.role });
        console.log("Fetched User:", data); // Debug log
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};