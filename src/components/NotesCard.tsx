import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface NoteCardProps {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  date: string;
  category: string[];
}

const NoteCard: React.FC<NoteCardProps> = ({ title, description, fileUrl, date, category }) => {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition border border-border bg-card h-full flex flex-col">
      <CardContent className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-accent" />
          <span className="text-xs text-muted-foreground">{new Date(date).toDateString()}</span>
        </div>

        <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
          {title}
        </h2>

        <p className="text-sm text-muted-foreground flex-1">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          {category.map((c) => (
            <span
              key={c}
              className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border"
            >
              {c}
            </span>
          ))}
        </div>

        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
        >
          Open Note →
        </a>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
