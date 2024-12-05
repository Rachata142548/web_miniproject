// src/app/dashboard/page.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ManageItems from './manage-items/page';

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        if (data.role === "Admin") {
          router.push("/dashboard/manage-items");
        } else if (data.role === "Viewer") {
          router.push("/dashboard/view-items");
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <ManageItems userRole={user.role} /> {/* ส่ง userRole เป็น props */}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default DashboardPage;