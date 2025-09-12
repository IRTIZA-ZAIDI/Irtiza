// pages/about/index.tsx
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import JobList from "@/components/JobList";
import ScrollAnimation from "@/components/ScrollAnimation";

const About = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="pt-20 pb-16">
        <div className="wide-container">
          {/* Header */}
          <ScrollAnimation direction="fade">
            <div className="mb-8 fade-in">
              <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-4">
                About
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                A little about me, my background, and what I’m exploring right
                now.
              </p>
            </div>
          </ScrollAnimation>

          {/* Content */}
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="space-y-16">
              {/* Introduction */}
              <section>
                <h2 className="font-sans text-2xl font-semibold text-foreground mb-6">
                  Hi, I'm Irtiza Zaidi
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I’m a data scientist who spends a suspicious amount of time
                  convincing large language models to behave nicely. My happy
                  place lies at the intersection of fine-tuning and model
                  interpretability, where I transform AI into intelligent,
                  transparent systems. With hands-on experience in LLM
                  fine-tuning, MLOps best practices, and applied ML research, I
                  thrive in bridging machine learning engineering with
                  explainability to create impactful, trustworthy solutions.
                </p>
              </section>

              {/* Job Experience */}
              <JobList />

              {/* Education */}
              <section>
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">
                  Education
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-sans font-medium text-accent mb-2">
                      B.S. Computer Science, Institute of Business
                      Administration (2021–2025)
                    </h4>
                    <p className="text-muted-foreground">
                      CGPA: 3.63 (Dean’s List). Coursework in ML, NLP, data
                      science, and software engineering.
                    </p>
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section>
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">
                  Technical Skills
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-sans font-medium text-accent mb-3">
                      Languages
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Python, Java, JavaScript
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-accent mb-3">
                      ML/AI
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      PyTorch, TensorFlow, Scikit-Learn, Transformers, LangChain
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-accent mb-3">
                      MLOps & Tools
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      MLflow, Weights & Biases, Hugging Face, TensorBoard
                    </p>
                  </div>
                </div>
              </section>

              {/* Currently */}
              <section>
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">
                  Currently
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    <strong className="text-accent">Reading:</strong> Research
                    papers on AI alignment and{" "}
                    <em>Reinforcement Learning from Human Feedback</em> by
                    Nathan Lambert.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-accent">Learning:</strong>{" "}
                    Reinforcement learning, interpretability techniques, and
                    performance optimization techniques.
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-accent">Building:</strong> Nothing
                    yet :(
                  </p>
                </div>
              </section>

              {/* Contact CTA */}
              <section className="bg-muted rounded-2xl p-8 text-center shadow-sm">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">
                  Let's Connect
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Always open to discussions on AI interpretability, LLM
                  fine-tuning, and impactful ML solutions.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <Button asChild className="btn-accent font-sans">
                    <a href="/contact">Get in Touch</a>
                  </Button>
                  <Button variant="outline" asChild className="font-sans">
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </a>
                  </Button>
                </div>

                <div className="flex items-center justify-center space-x-6">
                  <a
                    href="mailto:zirtiza110@gmail.com"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/zirtiza/"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://github.com/IRTIZA-ZAIDI"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </section>
            </div>
          </ScrollAnimation>
        </div>
      </main>
    </div>
  );
};

export default About;

