// src/app/page.tsx
import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-5xl font-extrabold drop-shadow-lg mb-6">Welcome to My Mini Project</h1>
      <p className="text-lg font-medium mb-8">This is the home page of my Next.js project.</p>
      <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
        Get Started
      </button>
    </div>
  );
}
