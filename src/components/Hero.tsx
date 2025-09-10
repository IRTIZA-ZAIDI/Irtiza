import React from "react";
import { cn } from "@/lib/utils";
// import FadeIn from './animations/FadeIn';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 z-10">
        <video
          src="/videos/7234993-uhd_3840_2160_30fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10 max-w-4xl">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white leading-tight mb-6">
            Irtiza
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-4 font-mono typing">
            Data Scientist
          </p>

          <p className="text-lg md:text-l text-white/90 mb-8">
            This is my space for experiments, notes, and reflections on turning
            data into understanding. I share projects I have built, problems I
            have solved, and questions I am still exploring.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
