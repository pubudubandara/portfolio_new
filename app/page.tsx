"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Script from "next/script";
import { usePageAnimations } from "@/hooks/usePageAnimations";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import ScrollSpyNavigation from "@/components/scroll-spy-navigation";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skill";
import {Projects} from "@/components/Projects";
import {Certificates} from "@/components/Certificates";
import {Contact} from "@/components/Contact";
import {Footer} from "@/components/Footer";

// Register ScrollToPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Portfolio() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Use the custom scroll spy hook
  const sections = ["hero", "about", "skills", "projects", "certificates", "contact"];
  const activeSection = useScrollSpy({ 
    sections,
    offset: 100  // Offset from top when section becomes active
  });

  // Initialize page animations
  usePageAnimations();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 0.6,
        scrollTo: { y: element, offsetY: 30 },
        ease: "power2.inOut",
      });
    }
    setIsMenuOpen(false);
  };

  if (!mounted) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Pubudu Bandara",
    "jobTitle": "Full Stack Developer",
    "description": "IT Undergraduate at University of Moratuwa specializing in web development",
    "url": "https://pubudubandara.com",
    "image": "https://pubudubandara.com/img.jpg",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Moratuwa"
    },
    "knowsAbout": ["Web Development", "React", "Next.js", "Full Stack Development", "JavaScript", "TypeScript"],
    "sameAs": [
      // Add your social media profiles here
      // "https://linkedin.com/in/yourprofile",
      // "https://github.com/yourprofile",
      // "https://twitter.com/yourprofile"
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Structured Data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/15 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.3))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.2))]" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl" />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        <Navigation
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

      <ScrollSpyNavigation 
        sections={[
          { id: "hero", label: "Home" },
          { id: "about", label: "About" },
          { id: "skills", label: "Skills" },
          { id: "projects", label: "Projects" },
          { id: "certificates", label: "Certificates" },
          { id: "contact", label: "Contact" },
        ]}
      />
      
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />

      <Footer />
      </div>
    </div>
  );
}