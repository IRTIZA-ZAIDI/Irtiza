import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="wide-container">
          {/* Header */}
          <div className="mb-16 fade-in">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">
              Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              A selection of machine learning projects, data science solutions, and AI systems 
              I've built to solve real-world problems and drive business impact.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-12 slide-in-up">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                role={project.role}
                slug={project.slug}
                imageUrl={project.imageUrl}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;