import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

// Type alias for clarity
type DataScienceLevel =
  | "Machine Learning"
  | "Classical"
  | "Generative AI"
  | "Reinforcement Learning";

const Projects = () => {
  // Build unique filter options
  const dataScienceLevels = useMemo(() => {
    const set = new Set<DataScienceLevel>();
    projects.forEach((p) => {
      if (Array.isArray(p.dataScienceLevel)) {
        p.dataScienceLevel.forEach((lvl) => set.add(lvl));
      } else if (typeof p.dataScienceLevel === "string") {
        set.add(p.dataScienceLevel as DataScienceLevel);
      }
    });
    return ["All", ...Array.from(set)];
  }, []);

  const domains = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => {
      if (Array.isArray(p.domain)) {
        p.domain.forEach((d: string) => s.add(d));
      }
    });
    return ["All", ...Array.from(s)];
  }, []);

  // Filter state
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Level check (array | string | null)
      const levelMatch =
        selectedLevel === "All" ||
        (Array.isArray(p.dataScienceLevel) &&
          p.dataScienceLevel.includes(selectedLevel as DataScienceLevel)) ||
        (typeof p.dataScienceLevel === "string" &&
          p.dataScienceLevel === selectedLevel);

      // Domain check (array)
      const domainMatch =
        selectedDomain === "All" ||
        (Array.isArray(p.domain) && p.domain.includes(selectedDomain));

      return levelMatch && domainMatch;
    });
  }, [selectedLevel, selectedDomain]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="pt-20 pb-16">
        <div className="wide-container">
          {/* Header */}
          <div className="mb-8 fade-in">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-4">
              Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Just projects. From cleaning messy data to deploying systems that
              actually work. My focus? Turning technical depth and curiosity
              into practical because the best models are the ones that get the
              job done.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:gap-4 gap-3">
            <div className="flex items-center gap-3">
              <label className="text-sm text-muted-foreground">
                DataScience Level:
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 rounded-md border border-border bg-card text-foreground"
              >
                {dataScienceLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-muted-foreground">Domain:</label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-3 py-2 rounded-md border border-border bg-card text-foreground"
              >
                {domains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedLevel("All");
                  setSelectedDomain("All");
                }}
                className="text-sm px-3 py-2 rounded-md border border-border bg-muted/40 hover:bg-muted transition"
              >
                Clear filters
              </button>

              <div className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredProjects.length}
                </span>{" "}
                of {projects.length}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-12 slide-in-up">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                slug={project.slug}
                imageUrl={project.imageUrl}
                dataScienceLevel={project.dataScienceLevel}
                domain={project.domain}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
