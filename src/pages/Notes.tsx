import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import ScrollAnimation from "@/components/ScrollAnimation";
import NoteCard from "@/components/NotesCard";
import { notes } from "@/data/notes";

const FilterBar: React.FC<{
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (v: string) => void;
  onClear: () => void;
  shown: number;
  total: number;
}> = ({ categories, selectedCategory, onCategoryChange, onClear, shown, total }) => (
  <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full">
    <div className="flex items-center gap-3">
      <label className="text-xs md:text-sm text-muted-foreground mr-1">
        Category
      </label>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="text-sm px-3 py-1.5 rounded-full border border-border bg-card text-foreground shadow-sm focus:outline-none"
      >
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
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

const Notes: React.FC = () => {
  const categories = useMemo(() => {
    const s = new Set<string>();
    notes.forEach((n) => {
      if (Array.isArray(n.category)) n.category.forEach((c) => s.add(c));
    });
    return ["All", ...Array.from(s)];
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      return (
        selectedCategory === "All" ||
        (Array.isArray(n.category) && n.category.includes(selectedCategory))
      );
    });
  }, [selectedCategory]);

  const clearFilters = () => {
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="pt-20 pb-16">
        <div className="wide-container">
          {/* Header */}
          <ScrollAnimation direction="fade">
            <div className="mb-8 fade-in">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 mt-6">
                Notes
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                A personal library of resources, guides, and quick references that helped me 
                understand concepts. Some are PDFs, mini-guides, or notes I’ve written along the way.
              </p>
            </div>
          </ScrollAnimation>

          {/* Filters */}
          <div className="mb-8">
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onClear={clearFilters}
              shown={filteredNotes.length}
              total={notes.length}
            />
          </div>

          {/* Notes Grid */}
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} {...note} />
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </main>
    </div>
  );
};

export default Notes;
