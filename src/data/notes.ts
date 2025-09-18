// data/notes.ts

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
    title: "Image Processing and CV Basics",
    description: "Introduction to fundamental image processing techniques and computer vision basics.",
    category: ["Computer Vision", "Image Processing"],
    fileUrl: "/notes/image_processing_cv_basics.pdf", // place file in public/notes
    date: "2025-01-12",
  },
  {
    id: "note-2",
    title: "Reinforcement Learning: Fundamentals",
    description: "Concise summary of RL fundamentals, based on David Silver’s lecture series. Covers core concepts, intuitive explanations, and examples.",
    category: ["Reinforcement Learning", "Machine Learning"],
    fileUrl: "/notes/rl_fundamentals.pdf",
    date: "2025-02-05",
  },
  {
    id: "note-3",
    title: "Reinforcement Learning for Language Models",
    description: "Structured notes on policy-gradient methods and enhancements, tailored for LLMs. Inspired by Ernest K. Ryu’s 'Reinforcement Learning of Large Language Models' course.",
    category: ["Reinforcement Learning", "LLMs", "NLP"],
    fileUrl: "/notes/rl_for_language_models.pdf",
    date: "2025-03-01",
  },
  {
    id: "note-4",
    title: "Entropy",
    description: "Brief notes explaining entropy, uncertainty, and its role in information theory and ML.",
    category: ["Information Theory", "Math"],
    fileUrl: "/notes/entropy.pdf",
    date: "2025-03-20",
  },
  {
    id: "note-5",
    title: "Random Number Generators",
    description: "Overview of random number generators, pseudorandomness, and applications in simulations and ML.",
    category: ["Math", "Probability"],
    fileUrl: "/notes/random_number_generators.pdf",
    date: "2025-04-02",
  },
];
