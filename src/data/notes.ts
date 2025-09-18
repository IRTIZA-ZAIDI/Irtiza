export interface Note {
  id: string;
  title: string;
  description: string;
  category: string[];
  fileUrl: string;   // link to PDF/Word/Doc/Markdown
  date: string;
}

export const notes: Note[] = [
  {
    id: "note-1",
    title: "Linear Algebra Refresher",
    description: "A concise PDF covering vectors, matrices, and key operations for ML.",
    category: ["Math", "ML Basics"],
    fileUrl: "/notes/linear_algebra_refresher.pdf", // put file inside public/notes
    date: "2025-01-10",
  },
  {
    id: "note-2",
    title: "Decision Trees Guide",
    description: "Quick reference guide to splitting criteria, pruning, and limitations.",
    category: ["Machine Learning"],
    fileUrl: "/notes/decision_trees_guide.pdf",
    date: "2025-02-02",
  },
  {
    id: "note-3",
    title: "NLP Cheatsheet",
    description: "Mini cheatsheet with embeddings, transformers, and tokenization tricks.",
    category: ["NLP", "Deep Learning"],
    fileUrl: "/notes/nlp_cheatsheet.pdf",
    date: "2025-03-15",
  },
];
