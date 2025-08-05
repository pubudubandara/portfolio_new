"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import ScrollSpyNavigation from "@/components/scroll-spy-navigation";
import AnimatedSection from "@/components/AnimatedSection";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skill";
import {Projects} from "@/components/Projects";
import {Resume }from "@/components/Resume";
import {Contact} from "@/components/Contact";
import {Footer} from "@/components/Footer";

export default function Portfolio() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "resume",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
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
          { id: "resume", label: "Resume" },
          { id: "contact", label: "Contact" },
        ]}
      />

      <AnimatedSection animation="fadeUp">
        <Hero />
      </AnimatedSection>

      <AnimatedSection animation="fadeLeft">
        <About />
      </AnimatedSection>

      <AnimatedSection animation="fadeRight">
        <Skills />
      </AnimatedSection>

      <AnimatedSection animation="fadeLeft">
        <Projects />
      </AnimatedSection>

      <AnimatedSection animation="fadeLeft">
        <Resume />
      </AnimatedSection>

      <AnimatedSection animation="fadeRight">
        <Contact />
      </AnimatedSection>

      <Footer />
    </div>
  );
}