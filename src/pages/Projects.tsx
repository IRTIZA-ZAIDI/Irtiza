import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

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
}) => (
  <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full">
    <div className="flex items-center gap-3">
      <label className="text-xs md:text-sm text-muted-foreground mr-1">
        Domain
      </label>
      <select
        value={selectedDomain}
        onChange={(e) => onDomainChange(e.target.value)}
        className="text-sm px-3 py-1.5 rounded-full border border-border bg-card text-foreground shadow-sm focus:outline-none"
      >
        {domains.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    </div>

    <div className="flex items-center gap-3">
      <label className="text-xs md:text-sm text-muted-foreground mr-1">
        Focus
      </label>
      <select
        value={selectedLevel}
        onChange={(e) => onLevelChange(e.target.value)}
        className="text-sm px-3 py-1.5 rounded-full border border-border bg-card text-foreground shadow-sm focus:outline-none"
      >
        {dataScienceLevels.map((lvl) => (
          <option key={lvl} value={lvl}>{lvl}</option>
        ))}
      </select>
    </div>

    <div className="ml-auto flex items-center gap-3">
      <button
        onClick={onClear}
        className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-border bg-muted/10 hover:bg-muted/20 transition"
      >
        Clear
      </button>

      <div className="flex items-center text-xs md:text-sm text-muted-foreground gap-2">
        <span>Showing</span>
        <span className="px-2 py-0.5 rounded-full bg-card border border-border text-foreground text-sm font-semibold">
          {shown}
        </span>
        <span>of {total}</span>
      </div>
    </div>
  </div>
);

const Projects: React.FC = () => {
  const dataScienceLevels = useMemo(() => {
    const set = new Set<DataScienceLevel>();
    projects.forEach((p) => {
      if (Array.isArray(p.dataScienceLevel)) p.dataScienceLevel.forEach(lvl => set.add(lvl));
      else if (typeof p.dataScienceLevel === "string") set.add(p.dataScienceLevel as DataScienceLevel);
    });
    return ["All", ...Array.from(set)];
  }, []);

  const domains = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => {
      if (Array.isArray(p.domain)) p.domain.forEach(d => s.add(d));
    });
    return ["All", ...Array.from(s)];
  }, []);

  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const levelMatch =
        selectedLevel === "All" ||
        (Array.isArray(p.dataScienceLevel) && p.dataScienceLevel.includes(selectedLevel as DataScienceLevel)) ||
        (typeof p.dataScienceLevel === "string" && p.dataScienceLevel === selectedLevel);

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

      <main className="pt-20 pb-16">
        <div className="wide-container">
          {/* Header */}
          <div className="mb-8 fade-in">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 mt-6">
              Projects
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              My projects are less about polished results and more about the process. I build to explore ideas, to make sense of concepts I’ve been studying, and to follow curiosity where it takes me. Along the way, I learn by doing.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <FilterBar
              dataScienceLevels={dataScienceLevels}
              domains={domains}
              selectedLevel={selectedLevel}
              selectedDomain={selectedDomain}
              onLevelChange={setSelectedLevel}
              onDomainChange={setSelectedDomain}
              onClear={clearFilters}
              shown={filteredProjects.length}
              total={projects.length}
            />
          </div>

          {/* Projects List/Grid */}
          <div className="hidden md:flex relative max-w-5xl mx-auto">
            {/* Desktop Carousel */}
            <div
              id="projects-carousel"
              className="flex gap-4 snap-x snap-mandatory overflow-x-auto px-6 scroll-smooth
                 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-stretch"
            >
              {filteredProjects.map((project) => (
                <div key={project.id} className="snap-center shrink-0 max-w-sm aspect-[4/5]">
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
            {/* Arrows */}
            <button
              onClick={() => document.getElementById("projects-carousel")?.scrollBy({ left: -260, behavior: "smooth" })}
              className="absolute top-[35%] -left-20 -translate-y-1/2 bg-accent/50 text-white rounded-full p-3 hover:bg-accent/70 transition"
            >
              ◀
            </button>
            <button
              onClick={() => document.getElementById("projects-carousel")?.scrollBy({ left: 260, behavior: "smooth" })}
              className="absolute top-[35%] -right-20 -translate-y-1/2 bg-accent/50 text-white rounded-full p-3 hover:bg-accent/70 transition"
            >
              ▶
            </button>
          </div>

          {/* Mobile List/Grid */}
          <div className="md:hidden grid grid-cols-1 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
