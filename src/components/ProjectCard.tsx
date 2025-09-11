import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  slug: string;
  imageUrl?: string;
  dataScienceLevel: string;
  domain: string[]; // multiple domain codes like ["NLP"], ["ML", "SWE"]
}

// Map domain codes -> full names
const domainMap: Record<string, string> = {
  NLP: "Natural Language Processing",
  CV: "Computer Vision",
  SWE: "Software Engineering",
  ML: "Machine Learning",
  GAI: "Generative AI",
};

export default function ProjectCard({
  title,
  description,
  technologies,
  imageUrl,
  dataScienceLevel,
  domain,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  // Convert codes to full forms & join with " & "
  const fullDomain = domain
    .map((d) => domainMap[d] || d)
    .join(" & ");

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => e.preventDefault()}
    >
      <Card className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 cursor-default bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-40 object-cover rounded-t-2xl pointer-events-none"
          />
        )}

        <CardContent className="p-5 select-none">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h3>

          {/* Domain */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {fullDomain}
          </p>

          {/* Description with smooth CSS transition */}
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

          {/* DataScienceLevel badge */}
          <div className="mt-3">
            <span
              className="inline-block text-xs font-medium px-3 py-1 rounded-full
                bg-blue-100 text-blue-700
                dark:bg-[hsl(340,80%,20%)]/50 dark:text-[hsl(340,80%,65%)]"
            >
              {dataScienceLevel}
            </span>
          </div>

          {/* Technologies */}
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
        </CardContent>
      </Card>
    </motion.div>
  );
}

