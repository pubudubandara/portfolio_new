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

    const timeline = gsap.timeline({ repeat: repeat ? -1 : 0 })
    timelineRef.current = timeline

    // Add cursor if enabled
    if (cursor) {
      element.style.borderRight = "2px solid currentColor"
      timeline.set(element, { borderRightColor: "transparent" })
    }

    texts.forEach((text, index) => {
      // Type in text - doubled speed
      timeline.to(element, {
        duration: text.length / (speed / 5), // Doubled typing speed (was speed / 30)
        text: text,
        ease: "none",
      })

      // Pause
      timeline.to({}, { duration: delay / 1500 }) // Reduced pause (was delay / 1000)

      // Only delete if not the last text or if repeating
      if (index < texts.length - 1 || repeat) {
        // Delete text - double the speed of typing (4x faster than original)
        timeline.to(element, {
          duration: text.length / (speed / 2.5), // 4x faster deletion (double of doubled typing)
          text: "",
          ease: "none",
        })

        // Shorter pause before next text
        if (index < texts.length - 1) {
          timeline.to({}, { duration: 0.3 }) // Reduced from 0.5
        }
      }
    })

    // Blinking cursor animation
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
      timeline.kill()
    }
  }, [texts, speed, delay, repeat, cursor])

  return textRef
}
