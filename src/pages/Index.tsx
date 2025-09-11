import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import ProjectCard from "@/components/ProjectCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog-posts";
import { projects } from "@/data/projects";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { Loader } from "@/components/Loader.tsx";
import { useLocation } from "react-router-dom"; // If using React Router
import Hero from "@/components/Hero";

const Index = () => {
  const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 2);
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 2);

  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const isDirectVisit =
      document.referrer === "" || // No referrer → fresh tab or bookmark
      !document.referrer.startsWith(window.location.origin); // Came from outside domain

    if (isDirectVisit) {
      // Keep loader for 3 seconds
      const timer = setTimeout(() => setLoading(false), 3000);
      return () => clearTimeout(timer);
    } else {
      // Skip loader if came from within the app
      setLoading(false);
    }
  }, [location.pathname]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header isHeroPage />

      {/* Hero Section */}
      <Hero />

      {/* Featured Blog Posts */}
      <section className="bg-muted/30 relative min-h-screen flex items-center">
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-5 hidden lg:block"></div>

        <div className="content-container relative z-10">
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-serif text-3xl font-semibold text-foreground">
                Recent Thoughts
              </h2>
              <a
                href="/blog"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-accent text-white font-sans font-medium hover:bg-primary/90 transition-colors"
              >
                View all posts
                <ArrowRight className="ml-2 h-5 w-6" />
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
          </ScrollAnimation>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-5 hidden lg:block"></div>

        <div className="content-container relative z-10">
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-serif text-3xl font-semibold text-foreground">
                Featured Work
              </h2>
              <a
                href="/Projects"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-accent text-white font-sans font-medium hover:bg-primary/90 transition-colors"
              >
                View all projects
                <ArrowRight className="ml-2 h-5 w-6" />
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
                  dataScienceLevel={project.dataScienceLevel}
                  domain={project.domain}
                />
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="bg-muted/30 min-h-screen flex items-center">
        <div className="narrow-container text-center">
          <ScrollAnimation direction="up" delay={0.3}>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
              Currently
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Convincing LLMs to behave in production and making models spill
                their secrets with interpretability tools
              </p>
              <p className="leading-relaxed">
                Always open to discussions on AI interpretability, LLM
                fine-tuning, and impactful ML solutions.
              </p>
            </div>
            
            <div className="bg-muted rounded-lg p-8 text-center mt-6">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Always open to discussions on AI interpretability, LLM
                  fine-tuning, and impactful ML solutions.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <Button asChild className="btn-accent font-sans">
                    <a href="/contact">Get in Touch</a>
                  </Button>
                  <Button variant="outline" asChild className="font-sans">
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* <Download className="mr-2 h-4 w-4" /> */}
                      Download Resume
                    </a>
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-6">
                  <a
                    href="mailto:zirtiza110@gmail.com"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/zirtiza/"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://github.com/IRTIZA-ZAIDI"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>

          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};

export default Index;
