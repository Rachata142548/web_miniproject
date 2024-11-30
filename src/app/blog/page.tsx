import Link from "next/link";

export default function BlogPage() {
  const dummyPosts = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <ul>
        {dummyPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
