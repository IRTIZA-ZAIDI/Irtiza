import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="content-container">
          {/* Header */}
          <div className="mb-16 fade-in">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">
              About
            </h1>
          </div>

          {/* Content */}
          <div className="slide-in-up">
            <div className="prose max-w-none">
              {/* Introduction */}
              <div className="mb-12">
                <h2 className="font-sans text-2xl font-semibold text-foreground mb-6">
                  Hi, I'm Irtiza Zaidi
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I’m a data scientist who spends a suspicious amount of time convincing large language models to behave nicely. 
                  My happy place lies at the intersection of fine-tuning and model interpretability, where I transform AI into intelligent, transparent systems. With hands-on experience in LLM fine-tuning, MLOps best practices, and applied ML research. 
                  I thrive in bridging machine learning engineering with explainability to create impactful, trustworthy solutions.
                </p>
                {/* <p className="text-lg text-muted-foreground leading-relaxed">
                  My recent work involves fine-tuning large language models for schema-aware
                  tabular classification, optimizing models for efficiency, and applying
                  explainable AI techniques to enhance model trustworthiness and performance.
                </p> */}
              </div>

              {/* Background */}
              <div className="mb-12">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">
                  Professional Background
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-sans font-medium text-foreground mb-2">
                      Data Scientist @ Securiti.ai (Jun 2025 – Present)
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Engineered synthetic data pipelines, fine-tuned LLaMA 1B Instruct for column classification
                      with 96% F1, and implemented schema-constrained generation using Outlines and Formatron fallbacks.
                      Applied MLflow for experiment tracking and reproducibility.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-foreground mb-2">
                      Data Science Intern @ Securiti.ai (Jun 2024 – Aug 2024)
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Fine-tuned open-source models (Mistral, LoRA/QLoRA), optimized detection models to achieve 90% precision 
                      with reduced compute, and applied SHAP to improve interpretability.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-foreground mb-2">
                      Data Science Intern @ 10Pearls (Sep 2024 – Nov 2024)
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Built a classifier with 96% accuracy. Developed a PostgreSQL-integrated NLP tool using Ollama, 
                      and enabled natural language querying and summarization (functional tooling).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-foreground mb-2">
                      Business Intelligence Intern @ Bank Al Habib (Jun 2023 – Jul 2023)
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Applied clustering algorithms to customer data, automated ETL processes, and implemented RFM analysis
                      to support targeted engagement.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mb-12">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">
                  Education
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-sans font-medium text-foreground mb-2">
                      B.S. Computer Science, Institute of Business Administration (2021–2025)
                    </h4>
                    <p className="text-muted-foreground">
                      CGPA: 3.63 (Dean’s List). Coursework in ML, NLP, data science, and software engineering.
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-12">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">
                  Technical Skills
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-sans font-medium text-foreground mb-3">Languages</h4>
                    <p className="text-muted-foreground text-sm">
                      Python, Java, JavaScript
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-foreground mb-3">ML/AI</h4>
                    <p className="text-muted-foreground text-sm">
                      PyTorch, TensorFlow, Scikit-Learn, Transformers, LangChain
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-foreground mb-3">MLOps & Tools</h4>
                    <p className="text-muted-foreground text-sm">
                      MLflow, Weights & Biases, Hugging Face, TensorBoard
                    </p>
                  </div>
                </div>
              </div>

              {/* Currently */}
              <div className="mb-12">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">
                  Currently
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    <strong className="text-foreground">Reading:</strong> Research papers on AI alignment and book Reinforcement Learning from Human Feedback by Nathan Lambert.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-foreground">Learning:</strong> Reinforcement learning, interpretability techniques, and performance optimization techniques.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-foreground">Building:</strong> Nothing yet :(
                  </p>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-muted/30 rounded-lg p-8 text-center">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">
                  Let's Connect
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Always open to discussions on AI interpretability, LLM fine-tuning, and impactful ML solutions.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <Button asChild className="btn-accent font-sans">
                    <a href="/contact">Get in Touch</a>
                  </Button>
                  <Button variant="outline" asChild className="font-sans">
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </a>
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-6">
                  <a href="mailto:zirtiza110@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/zirtiza/" className="text-muted-foreground hover:text-accent transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="https://github.com/IRTIZA-ZAIDI" className="text-muted-foreground hover:text-accent transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


export default About;