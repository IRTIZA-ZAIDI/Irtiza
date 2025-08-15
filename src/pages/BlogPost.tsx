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
    const parseInlineMarkdown = (text: string) => {
      // Inline code
      text = text.replace(/`([^`]+)`/g, '<code class="inline-code bg-gray-200 dark:bg-gray-700 px-1 rounded">$1</code>');
      // Bold
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent">$1</strong>');
      // Italic
      text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
      return text;
    };

    const lines = content.split("\n");
    const html: string[] = [];
    let codeBlockBuffer: string[] = [];
    let insideCodeBlock = false;

    const flushCodeBlock = () => {
      if (codeBlockBuffer.length > 0) {
        const codeContent = codeBlockBuffer.join("\n");
        html.push(
          `<div class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md p-3 mb-4 overflow-x-auto max-h-60"><code class="whitespace-pre-line">${codeContent}</code></div>`
        );
        codeBlockBuffer = [];
        insideCodeBlock = false;
      }
    };

    for (const line of lines) {
      if (line.trim().startsWith("```")) {
        if (insideCodeBlock) {
          flushCodeBlock();
        } else {
          insideCodeBlock = true;
        }
        continue;
      }

      if (insideCodeBlock) {
        codeBlockBuffer.push(line);
        continue;
      }

      // Headings
      if (line.startsWith("# ")) {
        const text = line.slice(2);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        html.push(`<h1 id="${id}">${parseInlineMarkdown(text)}</h1>`);
      } else if (line.startsWith("## ")) {
        const text = line.slice(3);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        html.push(`<h2 id="${id}">${parseInlineMarkdown(text)}</h2>`);
      } else if (line.startsWith("### ")) {
        const text = line.slice(4);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        html.push(`<h3 id="${id}">${parseInlineMarkdown(text)}</h3>`);
      } else if (line.startsWith("- ")) {
        html.push(`<li>${parseInlineMarkdown(line.slice(2))}</li>`);
      } else if (line.match(/^\d+\. /)) {
        html.push(`<li>${parseInlineMarkdown(line.replace(/^\d+\. /, ""))}</li>`);
      } else if (line.trim() === "") {
        html.push("<br>");
      } else {
        html.push(`<p>${parseInlineMarkdown(line)}</p>`);
      }
    }

    flushCodeBlock();

    const htmlString = html
      .join("\n")
      .replace(/(<li[^>]*>.*?<\/li>\n?)+/g, '<ul class="list-disc list-inside mb-6 space-y-1 ml-4">$&</ul>')
      .replace(/<br>\n<br>/g, '<div class="mb-8"></div>');

    return `<div class="prose">${htmlString}</div>`;
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
