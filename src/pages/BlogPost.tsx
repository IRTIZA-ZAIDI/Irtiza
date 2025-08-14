import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, X, List } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import TableOfContents from "@/components/TableOfContents";
import ScrollAnimation from "@/components/ScrollAnimation";
import { blogPosts } from "@/data/blog-posts";
import { motion } from "framer-motion";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const [tocOpen, setTocOpen] = useState(true);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="content-container">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Post Not Found
              </h1>
              <Link
                to="/blog"
                className="text-accent hover:text-accent-warm transition-colors"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Convert markdown-style content to HTML with proper IDs for headings
  const processContent = (content: string) => {
    return content
      .split("\n")
      .map((line) => {
        if (line.startsWith("# ")) {
          const text = line.slice(2);
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
          return `<h1 id="${id}" class="scroll-mt-24 text-4xl font-bold text-foreground mb-6 mt-12 first:mt-0">${text}</h1>`;
        }
        if (line.startsWith("## ")) {
          const text = line.slice(3);
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
          return `<h2 id="${id}" class="scroll-mt-24 text-2xl font-semibold text-foreground mb-4 mt-10">${text}</h2>`;
        }
        if (line.startsWith("### ")) {
          const text = line.slice(4);
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
          return `<h3 id="${id}" class="scroll-mt-24 text-xl font-medium text-foreground mb-3 mt-8">${text}</h3>`;
        }
        if (line.startsWith("- ")) {
          return `<li class="mb-1">${line.slice(2)}</li>`;
        }
        if (line.match(/^\d+\. /)) {
          return `<li class="mb-1">${line.replace(/^\d+\. /, "")}</li>`;
        }
        if (line.startsWith("**") && line.endsWith("**")) {
          return `<p class="font-semibold text-foreground mb-4">${line.slice(
            2,
            -2
          )}</p>`;
        }
        if (line.trim() === "") {
          return "<br>";
        }
        return `<p class="mb-4 text-foreground leading-relaxed">${line}</p>`;
      })
      .join("\n")
      .replace(
        /(<li[^>]*>.*?<\/li>\n?)+/g,
        '<ul class="list-disc list-inside mb-6 space-y-1 ml-4">$&</ul>'
      )
      .replace(/<br>\n<br>/g, '<div class="mb-8"></div>');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-10 pb-16 flex gap-8">
        {/* TOC column - always visible & sticky */}
        <div className="hidden lg:flex w-64 flex-shrink-0 relative h-screen">
          <div className="sticky max-h-[calc(100vh-5rem)] px-4 pt-8 bg-card rounded-2xl border border-grey">
            <TableOfContents content={post.content} />
          </div>
        </div>

        {/* Blog content - centered */}
        <div className="flex-1 items-start justify-center overflow-y-auto h-screen px-4">
          <div className="max-w-4xl w-full px-4">
            {/* TOC toggle button - only shows when closed */}
            {!tocOpen && (
              <button
                onClick={() => setTocOpen(true)}
                className="hidden lg:block p-2 mb-4 bg-muted text-foreground rounded hover:bg-muted/80"
              >
                Open TOC
              </button>
            )}
            <div className="bg-card rounded-2xl border border-grey p-8">
              {/* Header */}
              <ScrollAnimation direction="fade">
                <div className="wide-container">
                  <div className="max-w-4xl">
                    <Link
                      to="/blog"
                      className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors mb-8"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Blog
                    </Link>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="mb-12"
                    >
                      <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">
                        {post.title}
                      </h1>

                      <div className="flex items-center gap-6 text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <p className="text-xl text-muted-foreground leading-relaxed">
                        {post.excerpt}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </ScrollAnimation>

              <div className="wide-container">
                <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-12">
                  {/* Article Content */}
                  <ScrollAnimation
                    direction="up"
                    delay={0.3}
                    className="lg:col-span-4"
                  >
                    <article className="max-w-none">
                      <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: processContent(post.content),
                        }}
                      />
                    </article>
                  </ScrollAnimation>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <ScrollAnimation direction="up" delay={0.5}>
              <div className="content-container mt-16 pt-8 border-t border-border">
                <div className="flex justify-between items-center">
                  <Link
                    to="/blog"
                    className="text-accent hover:text-accent-warm transition-colors font-medium"
                  >
                    ← All Posts
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    Share this post
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
