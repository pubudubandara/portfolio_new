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