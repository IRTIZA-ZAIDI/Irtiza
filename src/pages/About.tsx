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
                  Hi, I'm Alex Chen
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I'm a data scientist and machine learning researcher passionate about building 
                  intelligent systems that solve real-world problems. With over 5 years of experience 
                  in the field, I've worked on everything from recommendation engines serving millions 
                  of users to fraud detection systems protecting financial transactions.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Currently, I'm focused on the intersection of machine learning research and production 
                  systems, exploring how to make AI more reliable, interpretable, and beneficial for society.
                </p>
              </div>

              {/* Background */}
              <div className="mb-12">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">
                  Professional Background
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-sans font-medium text-foreground mb-2">
                      Senior Data Scientist @ TechFlow Inc. (2022-Present)
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Leading ML initiatives for personalization and recommendation systems. 
                      Built and deployed models serving 2M+ users, improving engagement by 35%.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-foreground mb-2">
                      ML Engineer @ FinSecure (2020-2022)
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Developed real-time fraud detection systems processing $100M+ monthly transactions.
                      Reduced false positives by 60% while maintaining 99.5% detection accuracy.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-foreground mb-2">
                      Data Scientist @ StartupLab (2019-2020)
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Built NLP systems for sentiment analysis and content moderation across 12 languages.
                      Created data pipelines processing 500K+ social media posts daily.
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
                      M.S. Computer Science, Stanford University (2019)
                    </h4>
                    <p className="text-muted-foreground">
                      Specialization in Machine Learning and AI. Thesis on "Interpretable Deep Learning 
                      for High-Stakes Decision Making."
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-foreground mb-2">
                      B.S. Mathematics & Computer Science, UC Berkeley (2017)
                    </h4>
                    <p className="text-muted-foreground">
                      Summa Cum Laude. Research in statistical machine learning and optimization.
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
                      Python, SQL, R, Scala, JavaScript
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-foreground mb-3">ML/AI</h4>
                    <p className="text-muted-foreground text-sm">
                      TensorFlow, PyTorch, scikit-learn, XGBoost, Transformers
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-foreground mb-3">Infrastructure</h4>
                    <p className="text-muted-foreground text-sm">
                      Docker, Kubernetes, AWS, Apache Spark, Kafka
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
                    <strong className="text-foreground">Reading:</strong> "Weapons of Math Destruction" by Cathy O'Neil, 
                    "The Alignment Problem" by Brian Christian
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-foreground">Learning:</strong> Reinforcement learning for recommendation systems, 
                    federated learning techniques, AI safety and alignment
                  </p>
                  <p className="leading-relaxed">
                    <strong className="text-foreground">Building:</strong> Open source tools for ML model interpretability, 
                    writing about AI ethics and society
                  </p>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-muted/30 rounded-lg p-8 text-center">
                <h3 className="font-sans text-xl font-semibold text-foreground mb-4">
                  Let's Connect
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I'm always interested in discussing machine learning, AI ethics, and building 
                  systems that make a positive impact. Feel free to reach out!
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
                  <a href="mailto:hello@alexchen.dev" className="text-muted-foreground hover:text-accent transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href="https://linkedin.com/in/alexchen" className="text-muted-foreground hover:text-accent transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="https://github.com/alexchen" className="text-muted-foreground hover:text-accent transition-colors">
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