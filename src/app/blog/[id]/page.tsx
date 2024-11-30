export default function BlogDetailPage({ params }: { params: { id: string } }) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Blog Post {params.id}</h1>
        <p>This is the detail page for blog post {params.id}.</p>
      </div>
    );
  }
  