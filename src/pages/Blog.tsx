// pages/blog/index.tsx
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import LatestBlogCard from "@/components/LatestBlogCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import { blogPosts } from "@/data/blog-posts";

const Blog = () => {
  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Identify latest 1 post
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
          <div className="wide-container p-0">
            {/* Header */}
            <ScrollAnimation direction="fade">
              <div className="mb-8 fade-in">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 mt-6">
                  Blog
                </h1>
                <p className="text-sm md:text-lg text-muted-foreground leading-normal">
                  I use writing the way I use projects: to learn. These notes cover interview prep, concepts I’m revising, problems I’ve solved, and questions I’m still exploring in AI and data. It’s less about polished essays, more about capturing the process.
                </p>
              </div>
            </ScrollAnimation>

            {/* Blog Posts */}
            <ScrollAnimation direction="up" delay={0.3}>
              <div className="space-y-10">
                {sortedPosts.map((post) => {
                  const isLatest = latestIds.has(post.id);

                  if (!isLatest) {
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
                  }

                  // For latest post with accent line
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
