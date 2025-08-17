import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, X, List } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TableOfContents from "@/components/TableOfContents";
import ScrollAnimation from "@/components/ScrollAnimation";
import { blogPosts } from "@/data/blog-posts";
import { motion } from "framer-motion";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // or your choice
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-json";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const [tocOpen, setTocOpen] = useState(true);

  useEffect(() => {
    Prism.highlightAll();
  }, [post?.content]);

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
      /// Triple backtick code blocks with optional language
      //       text = text.replace(
      //         /```(?:\w+)?\n([\s\S]*?)```/g,
      //         `<div class="relative max-w-2xl mx-auto my-6">
      //     <div class="bg-gray-50 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      //       <div class="overflow-x-auto">
      //         <pre class="text-xs font-mono leading-snug bg-gray-50 text-gray-800 whitespace-pre-wrap overflow-x-hidden m-0 p-2">
      // <code class="language-python">$1</code>
      //         </pre>
      //       </div>
      //     </div>
      //   </div>`
      //       );
      // // Inline code
      // text = text.replace(
      //   /`([^`]+)`/g,
      //   '<code class="inline-code bg-gray-200 dark:bg-gray-700 px-1 rounded">$1</code>'
      // );
      // Bold
      text = text.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="text-accent">$1</strong>'
      );
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
        // // detect language if provided after ```lang
        // let firstLine = codeBlockBuffer[0].trim();
        // let lang = "text";

        // if (firstLine.startsWith("```")) {
        //   lang = firstLine.slice(3).trim() || "text";
        //   codeBlockBuffer.shift(); // remove the ```lang marker from buffer
        // }

        // also remove trailing ``` if it exists
        if (codeBlockBuffer[codeBlockBuffer.length - 1].trim() === "```") {
          codeBlockBuffer.pop();
        }

        // Join lines and trim trailing spaces from each line
        const codeContent = codeBlockBuffer
          .map((line) => line.replace(/\s+$/g, "")) // remove trailing spaces per line
          .join("\n")
          .trim(); // remove leading/trailing empty lines

        const codeHtml = Prism.highlight(
          codeContent,
          Prism.languages[currentLang] || Prism.languages.text,
          currentLang
        );

        html.push(
          `<pre class="rounded-xl !bg-neutral-950 ">
         <code class="language-${currentLang} block text-left overflow-y leading-snug">${codeHtml}</code>
       </pre>`
        );

        codeBlockBuffer = [];
        insideCodeBlock = false;
      }
    };

    let currentLang = "text";

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

      // Headings
      if (line.startsWith("# ")) {
        const text = line.slice(2);
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        html.push(`<h1 id="${id}">${parseInlineMarkdown(text)}</h1>`);
      } else if (line.startsWith("## ")) {
        const text = line.slice(3);
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        html.push(`<h2 id="${id}">${parseInlineMarkdown(text)}</h2>`);
      } else if (line.startsWith("### ")) {
        const text = line.slice(4);
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        html.push(`<h3 id="${id}">${parseInlineMarkdown(text)}</h3>`);
      } else if (line.startsWith("- ")) {
        html.push(`<li>${parseInlineMarkdown(line.slice(2))}</li>`);
      } else if (line.match(/^\d+\. /)) {
        html.push(
          `<li>${parseInlineMarkdown(line.replace(/^\d+\. /, ""))}</li>`
        );
      } else if (line.trim() === "") {
        html.push("<br>");
      } else {
        html.push(
          `<p class="font-sans text-lg text-foreground leading-loose mb-0 max-w-prose">${parseInlineMarkdown(
            line
          )}</p>`
        );
      }
    }

    flushCodeBlock();

    const htmlString = html
      .join("\n")
      .replace(
        /(<li[^>]*>.*?<\/li>\n?)+/g,
        '<ul class="font-sans list-disc list-inside ml-4">$&</ul>'
      )
      .replace(/<br>\n<br>/g, '<div class="mb-8"></div>');

    return `<div class="prose">${htmlString}</div>`;
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="pt-10 pb-16 flex justify-center">
        <div className="flex gap-8 max-w-7xl w-full">
          {/* 1st column - empty */}
          <div className="w-60"></div>

          {/* 2nd column - Blog content */}
          <div className="flex-1 px-4 flex justify-center">
            <div className="max-w-4xl w-full px-4">
              <div className="bg-card rounded-2xl border border-grey p-8">
                {/* Header */}
                <ScrollAnimation direction="fade">
                  <div className="wide-container">
                    <div className="max-w-4xl">
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
                        <h1 className="font-sans text-4xl md:text-4xl text-foreground mb-6">
                          {post.title}
                        </h1>

                        <div className="flex items-center gap-6 text-muted-foreground mb-6 font-sans">
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

                        <p className="font-sans text-l text-muted-foreground leading-relaxed">
                          {post.excerpt}
                        </p>
                        <hr className="my-8 border-t border-border" />
                      </motion.div>
                    </div>
                  </div>
                </ScrollAnimation>

                {/* Article Content */}
                <div className="wide-container">
                  <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <ScrollAnimation
                      direction="up"
                      delay={0.3}
                      className="lg:col-span-4"
                    >
                      <article className="max-w-none">
                        <div
                          className="prose prose-lg prose-p:mb-2 max-w-none"
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

          {/* 3rd column - TOC */}
          <div className="w-60 hidden lg:block flex-shrink-0">
            <div className="sticky top-20 max-h-[calc(100vh-5rem)] px-4 py-2 border-l border-[text-accent]">
              <TableOfContents content={post.content} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
