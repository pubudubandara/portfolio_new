'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, ExternalLink } from 'lucide-react'
import { ProjectsSkeleton } from '@/components/skeletons/ProjectsSkeleton'

interface Project {
  _id: string
  title: string
  description: string
  tech: string[]
  contribution: string
  github: string
  demo: string
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

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
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bg-muted/30 to-cyan-400/10"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Projects</h2>

        {projects.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No projects available at the moment.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card
                key={project._id}
                className="shadow-blue-500/50 hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>
                    <pre className="whitespace-pre-wrap mt-1">{project.description}</pre>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* My Contribution Section */}
                  {project.contribution?.trim() && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">My Contribution:</h4>
                      <p className="text-sm bg-muted/30 p-3 rounded-sm border-l-2 border-primary">
                        {project.contribution}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex space-x-4">
                    {/* Show GitHub button only if github is a non-empty string */}
                    {project.github?.trim() && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}

                    {/* Show Demo button only if demo is a non-empty string */}
                    {project.demo?.trim() && (
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}