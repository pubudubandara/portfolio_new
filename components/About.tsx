"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const text = textRef.current;
    const card = cardRef.current;

    if (!section || !title || !text || !card) return;

    // Set initial states
    gsap.set([title, text, card], { opacity: 0, y: 50 });

    // Create scroll-triggered animations
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    timeline
      .to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        text,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        card,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 relative mt-0 pt-0"
    >
      <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2
        ref={titleRef}
        className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent mb-4"
        >
        About Me
        </h2>

        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Text Section */}
        <div ref={textRef} className="space-y-6">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium text-justify">
          I'm a passionate Information Technology student at the University
          of Moratuwa, currently pursuing my BSc (Hons) in IT. 
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium text-justify">
          I'm currently focusing on learning web development, with a strong
          interest in the MERN stack. I enjoy building full-stack
          applications that solve real-world problems and am eager to keep
          growing through new challenges and technologies.
        </p>
        </div>

        {/* Right Card Section */}
        <div ref={cardRef} className="relative">
        <Card className="group relative overflow-hidden border border-gray-200/80 dark:border-gray-700/50 bg-white/85 dark:bg-slate-800/85 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 hover:bg-white/95 dark:hover:bg-slate-800/95 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
          <div className="relative z-10">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
            Education & Interests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
              University
            </h4>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              BSc (Hons) in Information Technology
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              University of Moratuwa
            </p>
            </div>
            <div>
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
              School
            </h4>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              St. Sylvester's College Kandy
            </p>
            </div>
            <div>
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
              Key Interests
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge
              variant="secondary"
              className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/80 dark:to-indigo-900/80 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700 hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-300 text-xs font-semibold px-3 py-1"
              >
              Web Development
              </Badge>
              <Badge
              variant="secondary"
              className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/80 dark:to-indigo-900/80 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700 hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-300 text-xs font-semibold px-3 py-1"
              >
              UI design
              </Badge>
              <Badge
              variant="secondary"
              className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/80 dark:to-indigo-900/80 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700 hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-300 text-xs font-semibold px-3 py-1"
              >
              Electronics
              </Badge>
            </div>
            </div>
          </CardContent>
          </div>
        </Card>
        </div>
      </div>
      </div>
    </section>
  );
};
