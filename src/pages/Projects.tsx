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

const FilterBar: React.FC<{
  dataScienceLevels: string[];
  domains: string[];
  selectedLevel: string;
  selectedDomain: string;
  onLevelChange: (v: string) => void;
  onDomainChange: (v: string) => void;
  onClear: () => void;
  shown: number;
  total: number;
}> = ({
  dataScienceLevels,
  domains,
  selectedLevel,
  selectedDomain,
  onLevelChange,
  onDomainChange,
  onClear,
  shown,
  total,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full">
      {/* Domain first (user requested) */}
      <div className="flex items-center gap-3">
        <label className="text-xs md:text-sm text-muted-foreground mr-1">
          Domain
        </label>
        <select
          value={selectedDomain}
          onChange={(e) => onDomainChange(e.target.value)}
          className="text-sm px-3 py-1.5 rounded-full border border-border bg-card text-foreground shadow-sm focus:outline-none"
          aria-label="Filter by domain"
        >
          {domains.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Focus (renamed from Level) */}
      <div className="flex items-center gap-3">
        <label className="text-xs md:text-sm text-muted-foreground mr-1">
          Focus
        </label>
        <select
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value)}
          className="text-sm px-3 py-1.5 rounded-full border border-border bg-card text-foreground shadow-sm focus:outline-none"
          aria-label="Filter by focus"
        >
          {dataScienceLevels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={onClear}
          className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-border bg-muted/10 hover:bg-muted/20 transition"
          aria-label="Clear filters"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Clear
        </button>

        <div className="flex items-center text-xs md:text-sm text-muted-foreground gap-2">
          <span className="text-muted-foreground">Showing</span>
          <span className="px-2 py-0.5 rounded-full bg-card border border-border text-foreground text-sm font-semibold">
            {shown}
          </span>
          <span className="text-muted-foreground">of {total}</span>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
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

  const clearFilters = () => {
    setSelectedLevel("All");
    setSelectedDomain("All");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="pt-20">
        <div className="wide-container p-0">
          {/* Header */}
          <div className="mb-4 fade-in">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 mt-6">
              Projects
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground leading-normal">
              My projects are less about polished results and more about the
              process. I build to explore ideas, to make sense of concepts I’ve
              been studying, and to follow curiosity where it takes me. Along the
              way, I learn by doing, whether that means debugging late into the
              night or finally seeing a system come together and work.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap md:flex-nowrap items-center justify-between gap-3 text-sm">
            {/* Left filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-muted-foreground">Level:</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-52 px-2 py-1.5 rounded-md border border-border bg-card text-foreground text-sm"
                >
                  {dataScienceLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-muted-foreground">Domain:</label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-52 px-2 py-1.5 rounded-md border border-border bg-card text-foreground text-sm"
                >
                  {domains.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedLevel("All");
                  setSelectedDomain("All");
                }}
                className="px-2 py-1.5 rounded-md border border-border bg-muted/40 hover:bg-muted transition"
              >
                Clear
              </button>

              <div className="text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredProjects.length}
                </span>{" "}
                / {projects.length}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Scrollable row */}
          <div
            id="projects-carousel"
            className="flex gap-4 snap-x snap-mandatory overflow-x-auto px-6 scroll-smooth 
               [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] 
               items-stretch"
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="snap-center shrink-0 max-w-sm aspect-[4/5]"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  slug={project.slug}
                  imageUrl={project.imageUrl}
                  dataScienceLevel={project.dataScienceLevel}
                  domain={project.domain}
                />
              </div>
            ))}
          </div>

          {/* Left arrow */}
          <button
            onClick={() => {
              const el = document.getElementById("projects-carousel");
              el?.scrollBy({ left: -260, behavior: "smooth" });
            }}
            className="absolute top-[35%] -left-20 -translate-y-1/2 bg-accent/50 text-white 
               rounded-full p-3 hover:bg-accent/70 transition"
          >
            ◀
          </button>

          {/* Right arrow */}
          <button
            onClick={() => {
              const el = document.getElementById("projects-carousel");
              el?.scrollBy({ left: 260, behavior: "smooth" });
            }}
            className="absolute top-[35%] -right-20 -translate-y-1/2 bg-accent/50 text-white 
               rounded-full p-3 hover:bg-accent/70 transition"
          >
            ▶
          </button>
        </div>
      </main>
    </div>
  );
};

export default Projects;
