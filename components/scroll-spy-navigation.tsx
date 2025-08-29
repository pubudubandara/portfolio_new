"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

// Register ScrollToPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin)
}

interface ScrollSpyNavigationProps {
  sections: Array<{
    id: string
    label: string
  }>
}

export default function ScrollSpyNavigation({ sections }: ScrollSpyNavigationProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "")

  useEffect(() => {
    const handleScroll = () => {
      // Get current scroll position
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollWithOffset = scrollPosition + windowHeight / 2; // Use center of viewport

      let currentSection = sections[0]?.id || ""; // default to first section

      for (let i = 0; i < sections.length; i++) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          // Check if the center of the viewport is within this section
          if (scrollWithOffset >= offsetTop && scrollWithOffset < offsetTop + offsetHeight) {
            currentSection = sections[i].id;
            break;
          }
          
          // Special case for the last section
          if (i === sections.length - 1 && scrollWithOffset >= offsetTop) {
            currentSection = sections[i].id;
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Initial call to set the correct section on page load
    setTimeout(handleScroll, 100); // Small delay to ensure elements are rendered

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true }); // Also handle resize
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sections, activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      gsap.to(window, {
        duration: 0.6,
        scrollTo: { y: element, offsetY: 30 },
        ease: "power2.inOut",
      });
    }
  }

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col space-y-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center"
          >
            {/* Active indicator with gradient */}
            <div
              className={`h-8 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "w-1 bg-gradient-to-b from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50 animate-pulse"
                  : "w-0.5 bg-gray-400/40 hover:bg-gray-400/60 "
              }`}
            />
            
            {/* Hover tooltip
            <div className="absolute left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-white dark:bg-slate-800 px-3 py-1 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {section.label}
                </span>
              </div>
            </div> */}
            
            {/* Active section label (always visible when active)
            {activeSection === section.id && (
              <div className="absolute left-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-md shadow-lg">
                  <span className="text-sm font-semibold text-white whitespace-nowrap">
                    {section.label}
                  </span>
                </div>
              </div>
            )} */}
          </button>
        ))}
      </div>
    </div>
  )
}