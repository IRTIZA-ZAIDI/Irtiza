interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
}

const BlogCard = ({ title, excerpt, date, readTime, slug }: BlogCardProps) => {
  return (
    <article className="group hover-lift">
      <a href={`/blog/${slug}`} className="block">
        <div className="bg-card border border-grey rounded-2xl p-6 space-y-2 hover:shadow-lg transition-shadow">
          <h3 className="font-sans font-semibold text-xl text-foreground group-hover:text-accent transition-colors duration-200">
            {title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</time>
            <span>•</span>
            <span>{readTime}</span>
          </div>
        </div>
      </a>
    </article>
  );
};

export default BlogCard;