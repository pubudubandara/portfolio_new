'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, ExternalLink, Code2 } from 'lucide-react'
import { ProjectsSkeleton } from '@/components/skeletons/ProjectsSkeleton'

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Project {
  _id: string
  title: string
  description: string
  imageUrl: string
  cloudinaryId: string
  tech: string[]
  github: string
  demo: string
  order: number
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (!loading && projects.length > 0) {
      const section = sectionRef.current
      const title = titleRef.current
      const projectsContainer = projectsRef.current

      if (!section || !title || !projectsContainer) return

      // Set initial states
      gsap.set([title], { opacity: 0, y: 50 })
      gsap.set(projectsContainer.children, { opacity: 0, y: 80, scale: 0.9 })

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
        .to(projectsContainer.children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        }, "-=0.4")

      return () => {
        timeline.kill()
      }
    }
  }, [loading, projects])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()

      if (data.success && Array.isArray(data.data)) {
        setProjects(data.data)
      } else {
        setProjects([])
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <ProjectsSkeleton />;
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent mb-4 pb-2">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16">
            <Code2 className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold">
              No projects available at the moment.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Check back soon for exciting new projects!
            </p>
          </div>
        ) : (
          <div ref={projectsRef} className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project._id}
                className="group relative overflow-hidden border border-gray-200/80 dark:border-gray-700/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02]"
                onMouseEnter={() => setHoveredProject(project._id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Gradient border effect - only visible on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 transition-opacity duration-300 ${
                    hoveredProject === project._id ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300 font-medium">
                        {project.description}
                      </pre>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Tech Stack */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/80 dark:to-indigo-900/80 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700 hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-300 text-xs font-semibold px-3 py-1"
                            style={{
                              animationDelay: `${(index * 100) + (techIndex * 50)}ms`,
                              animation: 'fadeInScale 0.4s ease-out forwards'
                            }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      {project.github?.trim() && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                          className="flex-1 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/70 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 group/btn font-semibold"
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                            View Code
                          </a>
                        </Button>
                      )}

                      {project.demo?.trim() && (
                        <Button 
                          size="sm" 
                          asChild
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn font-semibold"
                        >
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
              ))}
          </div>
        )}
      </div>
    </section>
  )
}