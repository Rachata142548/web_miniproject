import Head from "next/head";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Welcome to My Mini Project</title>
        <meta name="description" content="Explore features and start building something amazing with Next.js." />
      </Head>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-5xl font-extrabold mb-6 text-center drop-shadow-lg">
          Welcome to My Mini Project
        </h1>
        <p className="text-xl mb-6 max-w-lg text-center">
          This is the home page of my Next.js project. Explore the features and start building something amazing!
        </p>
        <Link
          href="/dashboard/auth"
          className="bg-white text-blue-500 px-6 py-3 rounded-full text-lg font-semibold shadow-lg transform transition-transform duration-300 hover:bg-blue-600 hover:text-white hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    </>
  );
}