import { useMemo, useState } from "react";

const experiences = [
  {
    id: "1",
    company: "Securiti.ai",
    title: "Assoc. Data Scientist @",
    duration: "June 2025 – Present",
    desc: [
      "Built synthetic data scripts to replicate real-world distributions for training/testing.",
      "Fine-tuned LLaMA 1B Instruct for column classification, reaching 96% F1 on tabular inputs.",
      "Ran error analysis to detect failure modes and refine decision boundaries.",
      "Used MLflow for experiment tracking, model versioning, and reproducibility.",
    ],
  },
  {
    id: "2",
    company: "Securiti.ai",
    title: "Data Science Intern @",
    duration: "June 2024 – August 2024",
    desc: [
      "Fine-tuned open-source models (Mistral) using QLoRA/LoRA for efficient adaptation.",
      "Performed data detection analysis to expose model weaknesses.",
      "Achieved 90% precision with 25% training data and 1/3 model size.",
      "Clustered embeddings with PCA to identify detection patterns.",
      "Followed MLOps best practices with Hugging Face + W&B tracking.",
      "Improved interpretability using SHAP to analyze false detections.",
    ],
  },
  {
    id: "3",
    company: "10Pearls",
    title: "Data Science Intern @",
    duration: "September 2024 – November 2024",
    desc: [
      "Built Random Forest classifier (96% accuracy) with feature engineering and tuning.",
      "Created NLP tooling pipeline using Ollama + SQL model with PostgreSQL.",
      "Enabled natural language queries, summaries, and insights from databases.",
    ],
  },
  {
    id: "4",
    company: "Bank Al Habib",
    title: "Business Intelligence Intern @",
    duration: "June 2023 – July 2023",
    desc: [
      "Applied clustering (K-means, DBSCAN, hierarchical) to analyze customer groups.",
      "Preprocessed data for RFM analysis to guide engagement strategies.",
      "Developed ETL pipeline to automate daily branch data processing.",
    ],
  },
];

export default function JobList() {
  // derive unique companies in original order
  const companies = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const e of experiences) {
      if (!seen.has(e.company)) {
        seen.add(e.company);
        list.push(e.company);
      }
    }
    return list;
  }, []);

  const [selectedCompany, setSelectedCompany] = useState<string>(companies[0]);

  const companyRoles = experiences.filter((e) => e.company === selectedCompany);

  return (
    <section className="mb-6">
      <h3 className="font-sans text-xl font-semibold text-foreground mb-2">
        Professional Background
      </h3>

      <div className="w-full md:flex md:items-center min-h-[420px]">
        <div className="w-full md:flex md:items-stretch min-h-[400px]">
          {/* LEFT */}
          <div className="md:w-1/4 md:pr-6 mb-3 md:mb-0 border-r border-border flex flex-col">
            <div
              role="tablist"
              aria-orientation="vertical"
              className="flex md:flex-col gap-2"
            >
              {companies.map((company) => {
                const active = company === selectedCompany;
                return (
                  <button
                    key={company}
                    onClick={() => setSelectedCompany(company)}
                    className={
                      "text-base font-medium px-3 py-2 rounded-lg text-left transition " +
                      (active
                        ? "bg-accent/10 text-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/5")
                    }
                  >
                    {company}
                  </button>
                );
              })}
            </div>
            {/* optional: spacer so bar always fills height */}
            <div className="flex-1" />
          </div>

          {/* RIGHT */}
          <div className="flex-1 md:pl-6 flex flex-col">
            <div className="space-y-6">
              {companyRoles.map((role) => (
                <article key={role.id} className="space-y-3">
                  <div>
                    <h4 className="text-lg text-accent">
                      {role.title} {role.company}
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      {role.duration}
                    </div>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-snug">
                    {role.desc.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                  {companyRoles.length > 1 && (
                    <div className="border-t border-border pt-2" />
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
