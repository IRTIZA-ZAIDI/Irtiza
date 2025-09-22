import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  slug: string;
  imageUrl?: string;
  dataScienceLevel: (
    | "Machine Learning"
    | "Classical"
    | "Generative AI"
    | "Reinforcement Learning"
  )[] | null;
  domain: string[];
  githubUrl?: string;
}

const domainMap: Record<string, string> = {
  NLP: "Natural Language Processing",
  CV: "Computer Vision",
  SWE: "Software Engineering",
  ML: "Machine Learning",
  GAI: "Generative AI",
  RL: "Reinforcement Learning",
};

export default function ProjectCard({
  title,
  description,
  technologies,
  imageUrl,
  dataScienceLevel,
  domain,
  slug,
  githubUrl,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const fullDomain = domain.map((d) => domainMap[d] || d).join(" & ");

  // Decide link → GitHub if exists, else internal page
  const projectLink = githubUrl || `/projects/${slug}`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 cursor-default bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 h-full flex flex-col">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-40 object-cover rounded-t-2xl pointer-events-none"
          />
        )}

        <CardContent className="p-5 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {fullDomain}
          </p>

          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${
              hovered
                ? "max-h-96 opacity-100 translate-y-0"
                : "max-h-16 opacity-60 translate-y-1"
            }`}
          >
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {description}
            </p>
          </div>

          {dataScienceLevel && dataScienceLevel.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {dataScienceLevel.map((level, i) => (
                <span
                  key={i}
                  className="inline-block text-xs font-medium px-3 py-1 rounded-full
                    bg-blue-100 text-blue-700
                    dark:bg-[hsl(340,80%,20%)]/50 dark:text-[hsl(340,80%,65%)]"
                >
                  {level}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={projectLink}
            target={githubUrl ? "_blank" : "_self"} // GitHub opens in new tab
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Open Project →
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}
