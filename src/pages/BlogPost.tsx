import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TableOfContents from "@/components/TableOfContents";
import ScrollAnimation from "@/components/ScrollAnimation";
import { blogPosts } from "@/data/blog-posts";
import { motion } from "framer-motion";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-json";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    Prism.highlightAll();
  }, [post?.content]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="content-container text-center">
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
        </main>
      </div>
    );
  }

  // Convert markdown-style content to HTML with proper IDs for headings
  const processContent = (content: string) => {
  const parseInlineMarkdown = (text: string) => {
    // Bold
    text = text.replace(
      /\*\*(.*?)\*\*/g,
      '<span class="text-accent font-medium">$1</span>'
    );
    // Inline code
    text = text.replace(
      /`([^`]+)`/g,
      '<code class="inline-code bg-gray-800 text-white px-1 rounded">$1</code>'
    );
    // Italic
    text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    return text;
  };

  const lines = content.split("\n");
  const html: string[] = [];
  let codeBlockBuffer: string[] = [];
  let insideCodeBlock = false;
  let currentLang = "text";

  const flushCodeBlock = () => {
    if (codeBlockBuffer.length === 0) return;

    // Remove trailing ```
    if (codeBlockBuffer[codeBlockBuffer.length - 1].trim() === "```") {
      codeBlockBuffer.pop();
    }

    const codeContent = codeBlockBuffer.join("\n");

    html.push(`
<div class="my-6 rounded-xl overflow-hidden border border-gray-700">
  <!-- Language label -->
  <div class="px-3 py-1 bg-gray-800 text-gray-200 text-xs font-mono">
    ${currentLang.toUpperCase()}
  </div>

  <!-- Code block -->
  <pre class="bg-gray-800 text-white px-3 py-4 font-mono overflow-x-auto rounded-b-xl">
<code class="font-light">
${codeContent}
</code>
  </pre>
</div>
    `);

    codeBlockBuffer = [];
    insideCodeBlock = false;
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (insideCodeBlock) {
        flushCodeBlock();
      } else {
        insideCodeBlock = true;
        currentLang = line.trim().slice(3).trim() || "text";
      }
      continue;
    }

    if (insideCodeBlock) {
      codeBlockBuffer.push(line);
      continue;
    }

    // Regular text and headings
    if (line.startsWith("# ")) {
      const text = line.slice(2);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      html.push(`<h1 id="${id}">${parseInlineMarkdown(text)}</h1>`);
    } else if (line.startsWith("## ")) {
      const text = line.slice(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      html.push(`<h2 class="font-serif" id="${id}">${parseInlineMarkdown(text)}</h2>`);
    } else if (line.trim() === "") {
      html.push("<br>");
    } else {
      html.push(`<p class="font-sans text-lg text-foreground leading-loose mb-0 max-w-prose">
        ${parseInlineMarkdown(line)}
      </p>`);
    }
  }

  flushCodeBlock(); // flush any remaining code

  return `<div class="wide-container p-0 prose">${html.join("\n")}</div>`;
};

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="pt-16 pb-16 flex justify-center px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row max-w-7xl w-full mt-8 gap-12">
          {/* Blog Content */}
          <div className="flex-1">
            <ScrollAnimation direction="fade">
              <div className="wide-container">
                <Link
                  to="/blog"
                  className="font-sans inline-flex items-center text-muted-foreground hover:text-accent transition-colors mb-8"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="font-serif text-4xl text-foreground mb-6">
                    {post.title}
                  </h1>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-accent mb-6 font-sans">
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

                  <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  <hr className="my-8 border-t border-border" />
                </motion.div>
              </div>
            </ScrollAnimation>

            {/* Article */}
            <div className="wide-container">
              <ScrollAnimation direction="up" delay={0.3}>
                <article className="prose prose-lg max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: processContent(post.content),
                    }}
                  />
                </article>
              </ScrollAnimation>
            </div>

            {/* Navigation */}
            <ScrollAnimation direction="up" delay={0.5}>
              <div className="content-container mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
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
            </ScrollAnimation>
          </div>

          {/* TOC - hidden on mobile */}
          <aside className="w-60 hidden lg:block flex-shrink-0">
            <div className="sticky top-20 max-h-[calc(100vh-5rem)] px-4 py-2 border-l border-border">
              <TableOfContents content={post.content} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
