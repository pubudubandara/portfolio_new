"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

// Register TextPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin)
}

interface UseGSAPTextAnimationProps {
  texts: string[]
  speed?: number
  delay?: number
  repeat?: boolean
  cursor?: boolean
}

export const useGSAPTextAnimation = ({
  texts,
  speed = 100,
  delay = 2000,
  repeat = true,
  cursor = true
}: UseGSAPTextAnimationProps) => {
  const textRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element || texts.length === 0) return

    const timeline = gsap.timeline({ 
      repeat: repeat ? -1 : 0,
      repeatDelay: 0.5 // Add a small delay between loops
    })
    timelineRef.current = timeline

    // Add cursor if enabled
    if (cursor) {
      element.style.borderRight = "2px solid currentColor"
      timeline.set(element, { borderRightColor: "transparent" })
    }

    texts.forEach((text, index) => {
      // Type in text
      timeline.to(element, {
        duration: text.length / (speed / 5),
        text: text,
        ease: "none",
      })

      // Pause with text displayed
      timeline.to({}, { 
        duration: delay / 1000,
        onStart: () => {
          // Ensure cursor is visible during pause
          if (cursor) {
            gsap.set(element, { borderRightColor: "currentColor" })
          }
        }
      })

      // Only delete if not the last text or if repeating
      if (index < texts.length - 1 || repeat) {
        // Delete text (faster than typing)
        timeline.to(element, {
          duration: text.length / (speed /1),
          text: "",
          ease: "none",
          onComplete: () => {
            // Hide cursor after deletion
            if (cursor && index === texts.length - 1 && repeat) {
              gsap.set(element, { borderRightColor: "transparent" })
            }
          }
        })

        // Short pause before next text (only if not the last text)
        if (index < texts.length - 1) {
          timeline.to({}, { duration: 0.3 })
        }
      }
    })

    // Blinking cursor animation (only when text is displayed)
    if (cursor) {
      const cursorTimeline = gsap.timeline({ repeat: -1 })
      cursorTimeline.to(element, {
        duration: 0.8,
        borderRightColor: "transparent",
        ease: "power2.inOut",
      })
      cursorTimeline.to(element, {
        duration: 0.8,
        borderRightColor: "currentColor",
        ease: "power2.inOut",
      })
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [texts, speed, delay, repeat, cursor])

  return textRef
}