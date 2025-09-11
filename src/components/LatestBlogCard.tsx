// components/LatestBlogCard.tsx
import React from 'react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
}

const LatestBlogCard = ({ title, excerpt, date, readTime, slug }: BlogCardProps) => {
  return (
    <article className="group h-full">
      <a href={`/blog/${slug}`} className="block h-full">
        <div className="grid grid-cols-[4px,1fr] h-full transition-transform duration-300 group-hover:-translate-y-1">
          {/* Accent line */}
          <div className="h-full bg-accent transition-colors duration-300 group-hover:bg-accent" />
          
          {/* Content area */}
          <div className="relative p-6 bg-transparent border-b border-border transition-all duration-300 group-hover:shadow-md h-full">
            {/* NEW badge */}
            <span
              className="absolute top-3 left-6 z-10 inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wide text-white bg-accent shadow-md badgePulse pointer-events-none select-none"
              aria-label="New post"
              role="status"
            >
              <span className="block w-1.5 h-1.5 rounded-full bg-white" />
              New
            </span>
            
            {/* Blog card content */}
            <div className="pt-6 space-y-2 h-full">
              <h3 className="font-serif font-semibold text-xl text-foreground transition-colors duration-200 group-hover:text-accent">
                {title}
              </h3>
              
              <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                {excerpt}
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-accent">
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
                <span>•</span>
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
};

export default LatestBlogCard;
