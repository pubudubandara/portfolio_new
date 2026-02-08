"use client";

import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AnimatedSection from "./AnimatedSection";

export const Hero = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const texts = [
    "Undergraduate in Information Technology 🎓",
    1500, // pause for 1.5 seconds
    "University of Moratuwa 🏫",
    1500,
    "Fullstack Developer 💻",
    1500,
  ];

  useEffect(() => {
    const timeline = gsap.timeline({ delay: 0.2 });

    // Animate profile image with swipe down instead of rotation
    if (imageRef.current) {
      gsap.set(imageRef.current, { y: -100, opacity: 0 });
      timeline.to(imageRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power3.out",
      });
    }

    // Animate name
    if (nameRef.current) {
      gsap.set(nameRef.current, { opacity: 0, y: 30 });
      timeline.to(
        nameRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }

    // Animate buttons
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.children;
      gsap.set(buttons, { opacity: 0, y: 40, scale: 0.8 });
      timeline.to(
        buttons,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "back.out(1.4)",
        },
        "-=0.2"
      );
    }

    // Floating animation for image (gentler movement)
    gsap.to(imageRef.current, {
      y: -8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 1.5,
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
      aria-label="Hero section - Introduction"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8 flex justify-center">
          <div ref={imageRef} className="relative group">
            {/* Animated gradient rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/15 via-violet-500/15 to-blue-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse rotate-90" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1200 animate-pulse rotate-180" />

            {/* Image container with gradient border on hover */}
            <div className="relative w-[220px] h-[220px] rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 p-1 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/30">
              <Image
                src="/img.jpg?height=200&width=200"
                alt="Pubudu Bandara - Full Stack Developer and IT Undergraduate"
                width={220}
                height={220}
                priority
                className="rounded-full w-full h-full object-cover relative z-10 border-4 border-white/90 dark:border-slate-800/90"
              />
            </div>
          </div>
        </div>

        <h1
          ref={nameRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent"
        >
          Pubudu Bandara
        </h1>

        {/* Text container with TypeAnimation */}
        <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 font-medium min-h-[4rem] sm:min-h-[2.5rem] mx-auto flex justify-center max-w-4xl px-4">
          <TypeAnimation
            sequence={texts}
            wrapper="span"
            speed={50}
            deletionSpeed={80}
            style={{ display: 'inline-block', textAlign: 'center' }}
            repeat={Infinity}
            cursor={true}
            className="text-center"
            aria-label="Rotating text showing Pubudu's roles and affiliations"
          />
        </p>

        {/* Buttons Section - Fixed position container */}
        <div className="w-full flex justify-center px-4 max-w-64 mx-auto">
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm sm:max-w-none"
          >
          <Button
            size="lg"
            className="magnetic-btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn font-semibold"
            asChild
          >
            <a
              href="https://drive.google.com/uc?export=download&id=1dz1FXPPt1fDrU1TS-a2DShDGTUD_hDep"
              download="PubuduCV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-5 w-5 group-hover/btn:rotate-12 transition-transform duration-300" />
              Download CV
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="magnetic-btn border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/70 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 font-semibold"
            onClick={() => {
              const section = document.getElementById("contact");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Mail className="mr-2 h-5 w-5" />
            Contact Me
          </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
