"use client"

import { useEffect } from "react"
import { gsap } from "gsap"

export const usePageAnimations = () => {
  useEffect(() => {
    // Simple page load animation
    gsap.fromTo(
      "body",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    )

    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.magnetic-btn')
    buttons.forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" })
      })
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: "back.out(1.7)" })
      })
    })

    // Cleanup function
    return () => {
      // Clean up event listeners
      buttons.forEach((btn) => {
        btn.removeEventListener('mouseenter', () => {})
        btn.removeEventListener('mouseleave', () => {})
      })
    }
  }, [])
}

export const createStaggerAnimation = (selector: string, delay = 0) => {
  return gsap.fromTo(
    selector,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    }
  )
}

export const createMagneticEffect = (element: HTMLElement) => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(element, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.3,
      ease: "power2.out"
    })
  })
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    })
  })
}
