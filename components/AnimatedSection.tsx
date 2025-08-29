"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type Props = {
  children: React.ReactNode
  animation?: "fadeUp" | "fadeLeft" | "fadeRight" | "scaleUp" | "slideUp" | "fadeInStagger"
  delay?: number
  duration?: number
  stagger?: number
}

export default function AnimatedSection({ 
  children, 
  animation = "fadeUp", 
  delay = 0,
  duration = 0.8,
  stagger = 0.1
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Ensure element is visible first
    gsap.set(element, { opacity: 1 })

    const ctx = gsap.context(() => {
      const animations = {
        fadeUp: () => {
          gsap.fromTo(element, 
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none",
              }
            }
          )
        },
        fadeLeft: () => {
          gsap.fromTo(element,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none",
              }
            }
          )
        },
        fadeRight: () => {
          gsap.fromTo(element,
            { opacity: 0, x: 50 },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none",
              }
            }
          )
        },
        scaleUp: () => {
          gsap.fromTo(element,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration,
              delay,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none",
              }
            }
          )
        },
        slideUp: () => {
          gsap.fromTo(element,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none",
              }
            }
          )
        },
        fadeInStagger: () => {
          const children = Array.from(element.children)
          gsap.fromTo(children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              stagger,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none",
              }
            }
          )
        }
      }

      // Apply the animation
      if (animations[animation]) {
        animations[animation]()
      }
    }, element)

    return () => {
      ctx.revert()
    }
  }, [animation, delay, duration, stagger])

  return (
    <div ref={ref} style={{ opacity: 1 }}>
      {children}
    </div>
  )
}
