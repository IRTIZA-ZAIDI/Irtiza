import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import ProjectCard from "@/components/ProjectCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog-posts";
import { projects } from "@/data/projects";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import heroArt from "@/assets/hero-art.jpg";
import abstractArt1 from "@/assets/abstract-art-1.jpg";
import abstractArt2 from "@/assets/abstract-art-2.jpg";

import { useState, useEffect } from "react";
import { Loader } from "@/components/Loader.tsx";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 2);
  const featuredProjects = projects.filter(project => project.featured).slice(0, 2);

  useEffect(() => {
    // Simulate initial load (could also wait for API or assets)
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />; // Show loader until ready

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background Art */}
        <div className="absolute inset-0 opacity-10">
        </div>
        <div className="content-container relative z-10">
          <ScrollAnimation direction="fade">
            <div className="max-w-2xl">
            <h1 className="font-sans text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Irtiza
            </h1>
            <p className="text-xl md:text-2xl text-accent mb-8 font-sans font-light leading-relaxed">
              Data Scientist
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              This is my space for experiments, notes, and reflections on turning data into understanding.
              I share projects I have built, problems I have solved, and questions I am still exploring.
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
                <a href="/blog">Read My Blogs</a>
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
          </ScrollAnimation>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="bg-muted/30 relative min-h-screen flex items-center">
        {/* Decorative Art */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-5 hidden lg:block">
        </div>
        <div className="content-container relative z-10">
          <ScrollAnimation direction="up" delay={0.2}>
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
          </ScrollAnimation>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="relative min-h-screen flex items-center">
        {/* Decorative Art */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-5 hidden lg:block">
        </div>
        <div className="content-container relative z-10">
          <ScrollAnimation direction="up" delay={0.2}>
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
          </ScrollAnimation>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="bg-muted/30 min-h-screen flex items-center">
        <div className="narrow-container text-center">
          <ScrollAnimation direction="up" delay={0.3}>
            <h2 className="font-sans text-2xl font-semibold text-foreground mb-6">Currently</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Convincing LLMs to behave in production and making models spill their secrets with interpretability tools
              </p>
              <p className="leading-relaxed">
                Always open to discussions on AI interpretability, LLM fine-tuning, and impactful ML solutions.
              </p>
            </div>
            
            <div className="mt-8">
              <Button asChild className="btn-accent font-sans">
                <a href="/contact">Get in Touch</a>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};

export default Index;
