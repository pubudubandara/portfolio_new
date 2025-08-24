"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Database,
  Wrench,
  Box,
  Cpu,
  Globe,
  Smartphone,
  Server,
} from "lucide-react";
import { SkillsSkeleton } from "@/components/skeletons/SkillsSkeleton";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Skill {
  _id: string;
  category: string;
  skills: string[];
  icon: string;
}

const getIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Code,
    Database,
    Wrench,
    Box,
    Cpu,
    Globe,
    Smartphone,
    Server,
  };
  return icons[iconName] || Code;
};

export const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    if (!loading && skills.length > 0) {
      const section = sectionRef.current
      const title = titleRef.current
      const skillsContainer = skillsRef.current

      if (!section || !title || !skillsContainer) return

      // Set initial states
      gsap.set([title], { opacity: 0, y: 50 })
      gsap.set(skillsContainer.children, { opacity: 0, y: 80, scale: 0.9 })

      // Create scroll-triggered animations
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })

      timeline
        .to(title, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        })
        .to(skillsContainer.children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        }, "-=0.4")

      return () => {
        timeline.kill()
      }
    }
  }, [loading, skills])

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
          <h2 ref={titleRef} className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent mb-4 pb-2">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
        </div>

        {skills.length === 0 ? (
          <div className="text-center py-16">
            <Code className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold">
              No skills available at the moment.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Check back soon for updates!
            </p>
          </div>
        ) : (
          <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => {
              const IconComponent = getIcon(skill.icon);
              return (
                <Card
                  key={skill._id}
                  className="group relative overflow-hidden border border-gray-200/80 dark:border-gray-700/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02]"
                  onMouseEnter={() => setHoveredCard(skill._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Gradient border effect - only visible on hover */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 transition-opacity duration-300 ${
                      hoveredCard === skill._id ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  <div className="relative z-10">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                        <IconComponent className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                        {skill.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skill.skills.map((skillItem, skillIndex) => (
                          <Badge
                            key={skillItem}
                            variant="secondary"
                            className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/80 dark:to-indigo-900/80 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700 hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-300 text-xs font-semibold px-3 py-1"
                            style={{
                              animationDelay: `${
                                index * 100 + skillIndex * 50
                              }ms`,
                              animation: "fadeInScale 0.4s ease-out forwards",
                            }}
                          >
                            {skillItem}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};