"use client";

import { useState, useEffect, lazy, Suspense } from "react";
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

// Lazy load components below the fold for better initial performance
const Skills = lazy(() => import("@/components/Skill").then(m => ({ default: m.Skills })));
const Projects = lazy(() => import("@/components/Projects").then(m => ({ default: m.Projects })));
const Certificates = lazy(() => import("@/components/Certificates").then(m => ({ default: m.Certificates })));
const Contact = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

// Loading fallback component
const SectionLoader = () => (
  <div className="py-20 px-4 flex justify-center items-center">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
    "url": "https://www.pubududev.me/",
    "image": "https://www.pubududev.me/img.jpg",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Moratuwa"
    },
    "knowsAbout": ["Web Development", "React", "Next.js", "Full Stack Development", "JavaScript", "TypeScript"],
    "sameAs": [
      // Add your social media profiles here
      "https://github.com/pubudubandara",
      "https://www.linkedin.com/in/pubudu-bandara",
      // "https://twitter.com/yourprofile"
    ]
  };

  return (
    <div className="min-h-screen text-foreground relative">
      {/* Structured Data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Grid pattern overlay for additional texture */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/15 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.3))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.2))]" />
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
      
      {/* Lazy loaded sections - only render when needed */}
      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Certificates />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      </div>
    </div>
  );
}