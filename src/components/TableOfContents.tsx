import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  containerSelector: string; // e.g. "#notion-container"
  recordMap?: any;           // 👈 added so we can re-run when NotionRenderer updates
}

const TableOfContents = ({ containerSelector, recordMap }: TableOfContentsProps) => {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const headings: TOCItem[] = [];
      container
        .querySelectorAll(".notion-h1, .notion-h2, .notion-h3")
        .forEach((parent) => {
          const textEl = parent.querySelector(".notion-h-title");
          if (!textEl) return;

          const text = textEl.textContent || "";
          const level = parent.classList.contains("notion-h1")
            ? 1
            : parent.classList.contains("notion-h2")
            ? 2
            : 3;

          const id =
            text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "") || crypto.randomUUID();

          (parent as HTMLElement).id = id;
          headings.push({ id, text, level });
        });

      console.log("TOC headings:", headings);
      setToc(headings);
    }, 500); // wait a bit for NotionRenderer to finish rendering

    return () => clearTimeout(timeout);
  }, [containerSelector, recordMap]); // 👈 re-run when recordMap changes

  // Track which heading is active in viewport
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (toc.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-24"
    >
      <h3 className="font-sans text-lg font-semibold text-foreground mb-4">
        On This Page
      </h3>
      <nav className="space-y-2">
        {toc.map(({ id, text, level }) => (
          <button
            key={id}
            onClick={() => scrollToHeading(id)}
            className={`
              block w-full text-left text-sm transition-colors duration-200
              ${activeId === id ? "text-accent font-semibold" : "text-muted-foreground"}
              ${level === 1 ? "ml-0" : level === 2 ? "ml-4" : "ml-8"}
            `}
          >
            {text}
          </button>
        ))}
      </nav>
    </motion.div>
  );
};

export default TableOfContents;
