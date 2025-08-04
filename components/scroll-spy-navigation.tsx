"use client"

import { useState, useEffect } from "react"

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
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
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
            title={section.label}
          >
            <div
              className={`h-8 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "w-1 bg-primary shadow-lg shadow-primary/50 animate-pulse"
                  : "w-0.5 bg-muted-foreground/40 hover:bg-muted-foreground hover:w-0.5"
              }`}
            />

            {/* Active indicator dot */}
            {/* {activeSection === section.id && (
              <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg animate-bounce" />
            )} */}

            {/* Tooltip on hover */}
            <div className="absolute left-6 px-2 py-1 bg-primary text-primary-foreground text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {section.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
