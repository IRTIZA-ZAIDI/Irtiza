import { useEffect, useState } from "react";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import LatestBlogCard from "@/components/LatestBlogCard";
import ScrollAnimation from "@/components/ScrollAnimation";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  slug: string;
  isNew?: boolean;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setPosts(data);
      } catch (err: any) {
        console.error("Failed to fetch posts:", err);
        setError(err.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const latestIds = new Set(sortedPosts.slice(0, 1).map((p) => p.id));

  return (
    <>
      <style>{`
        @keyframes softPulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.04); opacity: 0.9; }
        }
        .badgePulse { animation: softPulse 2.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .badgePulse { animation: none; } }
      `}</style>

      <div className="min-h-screen bg-background font-sans">
        <Header />

        <main className="pt-20 pb-16">
          <div className="wide-container p-4 md:p-0">
            {/* Header */}
            <ScrollAnimation direction="fade">
              <div className="mb-8 fade-in text-left md:text-left">
                <h1 className="font-serif text-4xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 mt-4 sm:mt-6">
                  Blog
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mx-auto md:mx-0">
                  I use writing the way I use projects: to learn. These notes
                  cover interview prep, concepts I’m revising, problems I’ve
                  solved, and questions I’m still exploring in AI and data. It’s
                  less about polished essays, more about capturing the process.
                </p>
              </div>
            </ScrollAnimation>

            {/* Blog Posts */}
            <ScrollAnimation direction="up" delay={0.3}>
              <div className="space-y-8 md:space-y-10">
                {error && <p className="text-red-500">Error: {error}</p>}
                {!loading &&
                  !error &&
                  sortedPosts.map((post) => {
                    if (post.isNew) {
                      return (
                        <LatestBlogCard
                          key={post.id}
                          title={post.title}
                          excerpt={post.excerpt}
                          date={post.date}
                          readTime={post.readTime}
                          slug={post.slug}
                        />
                      );
                    }

                    return (
                      <BlogCard
                        key={post.id}
                        title={post.title}
                        excerpt={post.excerpt}
                        date={post.date}
                        readTime={post.readTime}
                        slug={post.slug}
                      />
                    );
                  })}
              </div>
            </ScrollAnimation>
          </div>
        </main>
      </div>
    </>
  );
};

export default Blog;
