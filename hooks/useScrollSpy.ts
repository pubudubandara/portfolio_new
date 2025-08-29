"use client"

import { useState, useEffect } from "react"

interface UseScrollSpyOptions {
  sections: string[]
  offset?: number
}

export const useScrollSpy = ({
  sections,
  offset = 100
}: UseScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState(sections[0] || "")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element) {
          const { offsetTop } = element
          
          if (scrollPosition >= offsetTop) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    // Initial call
    setTimeout(handleScroll, 100)

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections, offset])

  return activeSection
}
