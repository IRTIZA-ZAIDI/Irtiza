interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  role: string;
  slug: string;
  imageUrl?: string;
}

const ProjectCard = ({ title, description, technologies, role, slug, imageUrl }: ProjectCardProps) => {
  return (
    <article className="group hover-lift">
      <a href={`/portfolio/${slug}`} className="block">
        <div className="space-y-4">
          {/* Project Image */}
          {imageUrl && (
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          
          {/* Project Content */}
          <div className="space-y-3">
            <div className="space-y-2">
              <h3 className="font-sans font-semibold text-xl text-foreground group-hover:text-accent transition-colors duration-200">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground font-sans">{role}</p>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="text-xs font-sans px-2 py-1 bg-muted text-muted-foreground rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
    </article>
  );
};

export default ProjectCard;