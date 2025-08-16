import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    setIsSubmitting(false);
    
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="narrow-container">
          {/* Header */}
          <div className="mb-16 text-center fade-in">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">
              Contact
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Always open to discussions on AI interpretability, LLM fine-tuning, and impactful ML solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 slide-in-up">
            {/* Contact Form */}
            <div>
              <h2 className="font-sans text-2xl font-semibold text-foreground mb-6">
                Send a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-sans text-sm font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-sans text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-sans text-sm font-medium">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="w-full"
                    placeholder="What would you like to discuss?"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="font-sans text-sm font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full resize-none"
                    placeholder="Tell me about your project, question, or just say hello..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-accent font-sans"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-sans text-2xl font-semibold text-foreground mb-6">
                Other Ways to Connect
              </h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-foreground mb-1">Email</h3>
                    <a 
                      href="mailto:hello@alexchen.dev" 
                      className="text-accent hover:text-accent-warm transition-colors"
                    >
                      zirtiza110@gmail.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Best for detailed discussions and project inquiries
                    </p>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Linkedin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-foreground mb-1">LinkedIn</h3>
                    <a 
                      href="https://www.linkedin.com/in/zirtiza/" 
                      className="text-accent hover:text-accent-warm transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @zirtiza
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Professional networking and career discussions
                    </p>
                  </div>
                </div>

                {/* GitHub */}
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Github className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-foreground mb-1">GitHub</h3>
                    <a 
                      href="https://github.com/IRTIZA-ZAIDI" 
                      className="text-accent hover:text-accent-warm transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @IRTIZA-ZAIDI
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Check out my open source projects and contributions
                    </p>
                  </div>
                </div>

                {/* Twitter
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Twitter className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-foreground mb-1">Twitter</h3>
                    <a 
                      href="https://twitter.com/alexchen_ml" 
                      className="text-accent hover:text-accent-warm transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @alexchen_ml
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Quick thoughts on ML, AI, and tech
                    </p>
                  </div>
                </div> */}
              </div>

              {/* Response Time */}
              <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-sans font-medium text-foreground mb-2">Response Time</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I typically respond to emails within 24-48 hours. For urgent matters or 
                  collaboration opportunities, feel free to mention that in your subject line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;