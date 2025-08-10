import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import { blogPosts } from "@/data/blog-posts";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="content-container">
          {/* Header */}
          <ScrollAnimation direction="fade">
            <div className="mb-16">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Thoughts on machine learning, data science, and the intersection of AI with society. 
              Writing about technical challenges, lessons learned, and the future of intelligent systems.
            </p>
            </div>
          </ScrollAnimation>

          {/* Blog Posts */}
          <ScrollAnimation direction="up" delay={0.3}>
            <div className="space-y-16">
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
          </ScrollAnimation>
        </div>
      </main>
    </div>
  );
};

export default Blog;