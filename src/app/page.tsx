import Head from "next/head";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Welcome to My Music Store</title>
        <meta
          name="description"
          content="Discover the best instruments and music accessories at our store!"
        />
      </Head>
      <div
        className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://images.squarespace-cdn.com/content/v1/6233ac9f033ebc66f4083513/01cc016f-5169-4f2d-8bc8-e8810a4488b0/_DSC7478.jpg')",
        }}
      >
        {/* เนื้อหา Body */}
        <div className="bg-black bg-opacity-50 p-10 rounded-lg text-center">
          <h1 className="text-6xl font-bold mb-6">
            Welcome to My Music Store
          </h1>
          <p className="text-2xl mb-6">
            Explore the finest instruments and musical gear!
          </p>
          {/* ลิงก์แบบใช้ Link (Next.js) */}
          <Link
            href="/dashboard/auth"
            className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:bg-purple-600 hover:scale-105"
          >
            Next Page
          </Link>
          {/* ลิงก์ไปยังเว็บไซต์ภายนอก */}
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 text-blue-300 underline hover:text-blue-500"
          >
          </a>
        </div>
      </div>
    </>
  );
}