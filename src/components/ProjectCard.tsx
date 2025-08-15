interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  role: string;
  slug: string;
  imageUrl?: string;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  role,
  slug,
  imageUrl
}: ProjectCardProps) => {
  return (
    <article
      className="group relative bg-card border border-border rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 hover:border-accent/50 transition-all duration-300 ease-out"
    >
      <a href={`/portfolio/${slug}`} className="block h-full p-6">
        <div className="flex flex-col h-full">
          {/* Project Image */}
          {imageUrl && (
            <div className="aspect-[16/9] bg-muted overflow-hidden rounded-xl mb-6">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          )}

          {/* Title & Role */}
          <div className="mb-4">
            <h3 className="font-sans font-bold text-xl text-foreground group-hover:text-accent transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm uppercase tracking-wide text-muted-foreground mt-1">
              {role}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
            {description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground border border-border hover:border-accent transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </a>
    </article>
  );
};

export default ProjectCard;
