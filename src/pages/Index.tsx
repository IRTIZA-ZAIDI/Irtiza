import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog-posts";
import { projects } from "@/data/projects";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const Index = () => {
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 2);
  const featuredProjects = projects.filter(project => project.featured).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="content-container">
          <div className="max-w-2xl fade-in">
            <h1 className="font-sans text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Alex Chen
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-sans font-light leading-relaxed">
              Data Scientist, Machine Learning Researcher, and Writer on AI & Society
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              I build intelligent systems that solve real-world problems and write about the intersection of technology and human experience. Currently exploring the frontiers of machine learning at the intersection of research and production.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild className="btn-accent font-sans">
                <a href="/portfolio">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" asChild className="font-sans">
                <a href="/blog">Read My Blog</a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <a href="mailto:hello@alexchen.dev" className="text-muted-foreground hover:text-accent transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/alexchen" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/alexchen" className="text-muted-foreground hover:text-accent transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-16 bg-muted/30">
        <div className="content-container">
          <div className="slide-in-up">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-sans text-3xl font-semibold text-foreground">Recent Thoughts</h2>
              <a href="/blog" className="btn-minimal font-sans">
                View all posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="space-y-12">
              {featuredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  slug={post.slug}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="content-container">
          <div className="slide-in-up">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-sans text-3xl font-semibold text-foreground">Featured Work</h2>
              <a href="/portfolio" className="btn-minimal font-sans">
                View all projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
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
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-16 bg-muted/30">
        <div className="narrow-container text-center">
          <div className="slide-in-up">
            <h2 className="font-sans text-2xl font-semibold text-foreground mb-6">Currently</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Building recommendation systems at scale • Writing about ML in production • 
                Reading "Weapons of Math Destruction" by Cathy O'Neil
              </p>
              <p className="leading-relaxed">
                Always open to interesting conversations about AI, ethics, and the future of work.
              </p>
            </div>
            
            <div className="mt-8">
              <Button asChild className="btn-accent font-sans">
                <a href="/contact">Get in Touch</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
