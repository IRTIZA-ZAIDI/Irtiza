import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blog-posts";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="content-container">
          {/* Header */}
          <div className="mb-16 fade-in">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Thoughts on machine learning, data science, and the intersection of AI with society. 
              Writing about technical challenges, lessons learned, and the future of intelligent systems.
            </p>
          </div>

          {/* Blog Posts */}
          <div className="space-y-16 slide-in-up">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                readTime={post.readTime}
                slug={post.slug}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;