"use client";

import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8 flex justify-center">
          <div className="relative group">
            {/* Animated gradient rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/15 via-violet-500/15 to-blue-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse rotate-90" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1200 animate-pulse rotate-180" />
            
            {/* Image container with gradient border on hover */}
            <div className="relative w-[220px] h-[220px] rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 p-1 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/30">
              <Image
                src="/img.jpeg?height=200&width=200"
                alt="Pubudu Bandara"
                width={220}
                height={220}
                className="rounded-full w-full h-full object-cover relative z-10 border-4 border-white/90 dark:border-slate-800/90"
              />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
          Pubudu Bandara
        </h1>
        
        <TypeAnimation
          className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-8 font-medium"
          sequence={[
            "Undergraduate in Information Technology🎓",
            2000,
            "University of Moratuwa",
            2000,
            "Fullstack Developer 💻",
            2000,
          ]}
          repeat={Infinity}
          deletionSpeed={90}
          speed={80}
        />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn font-semibold"
            asChild
          >
            <a 
              href="https://drive.google.com/uc?export=download&id=1dz1FXPPt1fDrU1TS-a2DShDGTUD_hDep" 
              download="PubuduCV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-5 w-5 group-hover/btn:rotate-12 transition-transform duration-300" />
              Download CV
            </a>
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/70 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 font-semibold"
            onClick={() => {
              const section = document.getElementById("contact");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Mail className="mr-2 h-5 w-5" />
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  );
};