// src/app/dashboard/page.tsx
import React from "react";

export default function Dashboard() {
  // ตัวอย่างข้อมูลที่จะโชว์ในหน้า Dashboard
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    posts: [
      { id: 1, title: "How to use Prisma with Next.js", date: "2024-11-25" },
      { id: 2, title: "Understanding React Server Components", date: "2024-11-20" },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">User Info</h2>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Posts</h2>
        {userData.posts.length > 0 ? (
          <ul className="list-disc pl-5">
            {userData.posts.map((post) => (
              <li key={post.id}>
                <p>
                  <strong>{post.title}</strong> - {post.date}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}
