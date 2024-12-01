"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email and Password are required.");
      setIsLoading(false);
      return;
    }

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const body: { email: string; password: string; remember?: string } = {
      email,
      password,
    };

    if (isLogin) {
      body["remember"] = remember ? "on" : undefined;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      console.log("Login Response Status:", response.status);
      console.log("Response Data:", data);

      if (response.ok) {
        alert(isLogin ? "Login successful" : "Registration successful");

        // แก้ไขการเปลี่ยนเส้นทาง:
        // ลองใช้ window.location.href แทนการใช้ router.push
        window.location.href = "/dashboard/manage-items"; // หรือเปลี่ยนเส้นทางตามที่ต้องการ
      } else {
        setErrorMessage(data.error?.message || data.error || "Something went wrong");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isLogin ? "Login" : "Register"}
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}
        <div className="mb-4">
          <label className="block text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-3 py-2 border rounded ${
              !email && errorMessage ? "border-red-500" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!email && errorMessage && (
            <p className="text-red-500 text-xs mt-1">Email is required</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`w-full px-3 py-2 border rounded ${
              !password && errorMessage ? "border-red-500" : ""
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!password && errorMessage && (
            <p className="text-red-500 text-xs mt-1">Password is required</p>
          )}
        </div>
        {isLogin && (
          <div className="mb-4">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((prev) => !prev)}
              />
              <span className="ml-2">Remember me</span>
            </label>
          </div>
        )}
        <button
          type="submit"
          className={`w-full py-2 rounded ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              {isLogin ? "Logging in..." : "Registering..."}
            </span>
          ) : isLogin ? (
            "Login"
          ) : (
            "Register"
          )}
        </button>
        <button
          type="button"
          onClick={() => setIsLogin((prev) => !prev)}
          className="w-full text-sm text-blue-500 mt-4"
        >
          {isLogin
            ? "Don't have an account? Register here"
            : "Already have an account? Login here"}
        </button>
      </form>

      <Link
        href="/dashboard/auth/manage-items"
        className="bg-white text-blue-500 px-6 py-3 rounded-full text-lg font-semibold shadow-lg transform transition-transform duration-300 hover:bg-blue-600 hover:text-white hover:scale-105"
      >

      </Link>
    </div>
    
  );
}
