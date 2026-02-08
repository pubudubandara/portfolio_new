"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlassCard } from "@/components/ui/glass-card";
import Image from "next/image";
import { SkillsSkeleton } from "@/components/skeletons/SkillsSkeleton";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Skill {
  _id: string;
  name: string;
  imageUrl: string;
  cloudinaryId: string;
  order: number;
}

export const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    if (!loading && skills.length > 0) {
      const section = sectionRef.current;
      const title = titleRef.current;
      const skillsContainer = skillsRef.current;

      if (!section || !title || !skillsContainer) return;

      // Set initial states
      gsap.set([title], { opacity: 0, y: 50 });
      gsap.set(skillsContainer.children, { opacity: 0, y: 80, scale: 0.9 });

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
          duration: 0.6,
          ease: "power3.out",
        })
        .to(
          skillsContainer.children,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3"
        );

      return () => {
        timeline.kill();
      };
    }
  }, [loading, skills]);

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/skills");
      const data = await response.json();

      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setSkills(data.data);
      } else {
        setSkills([]);
      }
    } catch (error) {
      console.error("Failed to fetch skills:", error);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SkillsSkeleton />;
  }

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent mb-4 pb-2"
          >
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
        </div>

        {skills.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-2xl">💻</span>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold">
              No skills available at the moment.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Check back soon for updates!
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            {/* FLEX layout to keep fixed card size and center leftovers */}
            <div
              ref={skillsRef}
              className="flex flex-wrap justify-center gap-6"
            >
              {skills.map((skill) => (
                <GlassCard
                  key={skill._id}
                  className="cursor-pointer w-32 shrink-0 hover:scale-[1.05]"
                  onMouseEnter={() => setHoveredCard(skill._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Gradient border effect - only visible on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 transition-opacity duration-300 ${
                      hoveredCard === skill._id ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div className="relative z-10 p-4 text-center">
                    {/* Skill Image */}
                    <div className="w-16 h-16 mx-auto mb-3 relative">
                      <Image
                        src={skill.imageUrl}
                        alt={skill.name}
                        fill
                        loading="lazy"
                        className="object-contain rounded-lg"
                        sizes="(max-width: 768px) 64px, 64px"
                      />
                    </div>

                    {/* Skill Name */}
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                      {skill.name}
                    </h3>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
