import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const experiences = [
  {
    company: "Securiti.ai",
    title: "Data Scientist @",
    duration: "JUL 2022 - PRESENT",
    desc: [
      "Led development of end-to-end region build automation across Route 53 (AWS's DNS web service)...",
      "Re-built Route 53's core domain management and DNS systems...",
    ],
  },
  {
    company: "10Pearls",
    title: "Associate Engineer @",
    duration: "MAY 2020 - APR 2021",
    desc: [
      "Developed a responsive React web page (Story Details) from scratch...",
      "Iteratively built web experiences for 80 million users...",
      "Collaborated with senior engineers and product management...",
    ],
  },
  {
    company: "Bank Al Habib",
    title: "Research Engineer @",
    duration: "MAY 2021 - SEPT 2021",
    desc: [
      "Developed and researched an NLP-based framework using Spacy and Stanza...",
      "Selected for DCS Research Award ($4,000)...",
    ],
  },
];

export default function JobList() {
  return (
    <div className="my-12 font-sans">
      <h2 className="!mb-8">Professional Background</h2>
      <Tabs defaultValue="Securiti.ai" className="w-full md:flex">
        {/* LEFT COLUMN: Heading + TabsList */}
        <div className="md:flex md:flex-col md:min-w-[220px] md:mr-8 mt-20">
          <TabsList className="flex md:flex-col bg-transparent space-y-2 p-[0px]">
            {experiences.map((exp) => (
              <TabsTrigger
                key={exp.company}
                value={exp.company}
                className="text-[15px] data-[state=active]:bg-transparent data-[state=active]:text-accent"
              >
                {exp.company}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* RIGHT COLUMN: Content */}
        <div className="flex-1 md:border-l md:border-gray-500">
          {experiences.map((exp) => (
            <TabsContent key={exp.company} value={exp.company} className="min-h-[350px] p-[25px]">
              <h4 className="font-sans font-medium text-accent mb-2">
                {exp.title} {exp.company} 
              </h4>
              <div className="text-sm text-muted-foreground mb-3">
                {exp.duration}
              </div>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {exp.desc.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
