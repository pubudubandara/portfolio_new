'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Edit, Trash2, Save, X, LogOut, Upload, Home } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Skill {
  _id?: string;
  name: string;
  imageUrl: string;
  cloudinaryId: string;
  order: number;
}

interface Project {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  cloudinaryId: string;
  tech: string[];
  github: string;
  demo: string;
  order: number;
}

interface Contribution {
  _id?: string;
  title: string;
  description: string;
  organization: string;
  type: string;
  tech: string[];
  github: string;
  demo: string;
  pullRequestUrl: string;
  status: string;
}

const AdminPanel = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingContribution, setEditingContribution] = useState<Contribution | null>(null)
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [isAddingContribution, setIsAddingContribution] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Fetch data on component mount
  useEffect(() => {
    fetchData()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'GET',
      });
      
      if (response.ok) {
        toast({ title: 'Success', description: 'Logged out successfully' });
        window.location.href = '/login';
      } else {
        toast({ title: 'Error', description: 'Logout failed', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Logout failed', variant: 'destructive' });
    }
  }

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [skillsResponse, projectsResponse] = await Promise.all([
        fetch('/api/skills'),
        fetch('/api/projects')
      ])
      
      const skillsData = await skillsResponse.json()
      const projectsData = await projectsResponse.json()
      
      if (skillsData.success && skillsData.data.length > 0) {
        setSkills(skillsData.data)
      } else {
        // Initialize default skills if none exist
        await initializeDefaultSkills()
      }
      
      if (projectsData.success) setProjects(projectsData.data)
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch data', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const initializeDefaultSkills = async () => {
    try {
      const response = await fetch('/api/init-skills', { method: 'POST' })
      const data = await response.json()
      if (data.success) {
        setSkills(data.data)
        toast({ title: 'Info', description: 'Default skill categories initialized' })
      }
    } catch (error) {
      console.error('Failed to initialize default skills:', error)
    }
  }

  // Skill management functions
  const handleSaveSkill = async (skill: Skill) => {
    try {
      const method = skill._id ? 'PUT' : 'POST'
      const response = await fetch('/api/skills', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill)
      })
      
      const data = await response.json()
      
      if (data.success) {
        fetchData()
        setEditingSkill(null)
        toast({ title: 'Success', description: `Skill ${skill._id ? 'updated' : 'created'} successfully!` })
      } else {
        toast({ title: 'Error', description: data.error, variant: 'destructive' })
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save skill', variant: 'destructive' })
    }
  }

  const handleDeleteSkill = async (id: string) => {
    try {
      const response = await fetch(`/api/skills?id=${id}`, { method: 'DELETE' })
      const data = await response.json()
      
      if (data.success) {
        fetchData()
        toast({ title: 'Success', description: 'Skill deleted successfully!' })
      } else {
        toast({ title: 'Error', description: data.error, variant: 'destructive' })
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete skill', variant: 'destructive' })
    }
  }

  // Project management functions
  const handleSaveProject = async (project: Project) => {
    try {
      const method = project._id ? 'PUT' : 'POST'
      const response = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      })
      
      const data = await response.json()
      
      if (data.success) {
        fetchData()
        setEditingProject(null)
        setIsAddingProject(false)
        toast({ title: 'Success', description: `Project ${project._id ? 'updated' : 'created'} successfully!` })
      } else {
        toast({ title: 'Error', description: data.error, variant: 'destructive' })
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save project', variant: 'destructive' })
    }
  }

  const handleDeleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
      const data = await response.json()
      
      if (data.success) {
        fetchData()
        toast({ title: 'Success', description: 'Project deleted successfully!' })
      } else {
        toast({ title: 'Error', description: data.error, variant: 'destructive' })
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete project', variant: 'destructive' })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
        <div className="text-lg bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent font-bold">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
            Portfolio Admin Panel
          </h1>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-1 rounded-lg border border-gray-200/80 dark:border-gray-700/50">
            <TabsTrigger 
              value="skills" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 rounded-md"
            >
              Skills Management
            </TabsTrigger>
            <TabsTrigger 
              value="projects"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 rounded-md"
            >
              Projects Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
                  Skills Management
                </h2>
                <Button 
                  onClick={() => setEditingSkill({ name: '', imageUrl: '', cloudinaryId: '', order: 0 })}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill) => (
                  <SkillCard
                    key={skill._id}
                    skill={skill}
                    onEdit={setEditingSkill}
                    onDelete={handleDeleteSkill}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
                  Projects
                </h2>
                <Button 
                  onClick={() => setIsAddingProject(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    onEdit={setEditingProject}
                    onDelete={handleDeleteProject}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Skill Edit Modal */}
        {editingSkill && (
          <SkillEditor
            skill={editingSkill}
            onSave={handleSaveSkill}
            onCancel={() => {
              setEditingSkill(null)
            }}
          />
        )}

        {/* Project Edit/Add Modal */}
        {(editingProject || isAddingProject) && (
          <ProjectEditor
            project={editingProject || { title: '', description: '', imageUrl: '', cloudinaryId: '', tech: [], github: '', demo: '', order: 0 }}
            onSave={handleSaveProject}
            onCancel={() => {
              setEditingProject(null)
              setIsAddingProject(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

// Skill Card Component
const SkillCard = ({ skill, onEdit, onDelete }: { 
  skill: Skill, 
  onEdit: (skill: Skill) => void,
  onDelete: (id: string) => void
}) => (
  <Card className="group relative overflow-hidden border border-gray-200/80 dark:border-gray-700/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02]">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
    <div className="relative z-10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 relative">
            <Image
              src={skill.imageUrl}
              alt={skill.name}
              fill
              className="object-contain rounded-lg"
              sizes="48px"
            />
          </div>
          <div>
            <CardTitle className="text-lg group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
              {skill.name}
            </CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Order: {skill.order}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(skill)}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/50">
              <AlertDialogHeader>
                <AlertDialogTitle className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
                  Delete Skill
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-700 dark:text-gray-300">
                  Are you sure you want to delete "{skill.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/80 transition-all duration-300">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => skill._id && onDelete(skill._id)}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white transition-all duration-300"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
    </div>
  </Card>
)

// Project Card Component  
const ProjectCard = ({ project, onEdit, onDelete }: { 
  project: Project, 
  onEdit: (project: Project) => void, 
  onDelete: (id: string) => void 
}) => (
  <Card className="group relative overflow-hidden border border-gray-200/80 dark:border-gray-700/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02]">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
    <div className="relative z-10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
            {project.title}
          </CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Order: {project.order}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(project)}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/50">
              <AlertDialogHeader>
                <AlertDialogTitle className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
                  Delete Project
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-700 dark:text-gray-300">
                  Are you sure you want to delete "{project.title}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/80 transition-all duration-300">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => project._id && onDelete(project._id)}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white transition-all duration-300"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tech.map((tech, index) => (
            <Badge 
              key={index} 
              variant="outline"
              className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/80 dark:to-indigo-900/80 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700 hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-300"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </div>
  </Card>
)

// Skill Editor Component
const SkillEditor = ({ skill, onSave, onCancel }: {
  skill: Skill,
  onSave: (skill: Skill) => void,
  onCancel: () => void
}) => {
  const [editSkill, setEditSkill] = useState(skill)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-skill-image', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (data.success) {
        setEditSkill({
          ...editSkill,
          imageUrl: data.data.imageUrl,
          cloudinaryId: data.data.cloudinaryId
        })
        toast({ title: 'Success', description: 'Image uploaded successfully!' })
      } else {
        toast({ title: 'Error', description: data.error, variant: 'destructive' })
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to upload image', variant: 'destructive' })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
            {skill._id ? 'Edit' : 'Add'} Skill
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Skill Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Skill Name</label>
            <Input
              placeholder="Enter skill name"
              value={editSkill.name}
              onChange={(e) => setEditSkill({ ...editSkill, name: e.target.value })}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50"
            />
          </div>

          {/* Skill Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Skill Image</label>
            <div className="flex items-center space-x-4">
              {editSkill.imageUrl && (
                <div className="w-16 h-16 relative">
                  <Image
                    src={editSkill.imageUrl}
                    alt={editSkill.name}
                    fill
                    className="object-contain rounded-lg"
                    sizes="64px"
                  />
                </div>
              )}
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50"
                />
                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
              </div>
            </div>
          </div>

          {/* Order */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Display Order</label>
            <Input
              type="number"
              placeholder="0"
              value={editSkill.order}
              onChange={(e) => setEditSkill({ ...editSkill, order: parseInt(e.target.value) || 0 })}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50"
            />
          </div>

          <div className="flex space-x-2">
            <Button 
              onClick={() => onSave(editSkill)} 
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300"
              disabled={!editSkill.name || !editSkill.imageUrl || uploading}
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button 
              variant="outline" 
              onClick={onCancel} 
              className="flex-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/80 transition-all duration-300"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Project Editor Component
const ProjectEditor = ({ project, onSave, onCancel }: {
  project: Project,
  onSave: (project: Project) => void,
  onCancel: () => void
}) => {
  const [editProject, setEditProject] = useState(project)
  const [newTech, setNewTech] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload-project-image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        setEditProject({
          ...editProject,
          imageUrl: data.data.imageUrl,
          cloudinaryId: data.data.cloudinaryId
        })
      } else {
        alert('Failed to upload image: ' + data.error)
      }
    } catch (error) {
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const addTech = () => {
    if (newTech.trim()) {
      setEditProject({
        ...editProject,
        tech: [...editProject.tech, newTech.trim()]
      })
      setNewTech('')
    }
  }

  const removeTech = (index: number) => {
    setEditProject({
      ...editProject,
      tech: editProject.tech.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
            {project._id ? 'Edit' : 'Add'} Project
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Project Title"
            value={editProject.title}
            onChange={(e) => setEditProject({ ...editProject, title: e.target.value })}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50"
          />
          <Textarea
            placeholder="Project Description"
            value={editProject.description}
            onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
            rows={3}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50"
          />
          
          {/* Project Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Image</label>
            <div className="flex items-center space-x-4">
              {editProject.imageUrl && (
                <div className="w-20 h-20 relative">
                  <Image
                    src={editProject.imageUrl}
                    alt="Project preview"
                    fill
                    className="object-cover rounded-lg"
                    sizes="80px"
                  />
                </div>
              )}
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50"
                />
                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
              </div>
            </div>
          </div>

          {/* Order */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Display Order</label>
            <Input
              type="number"
              placeholder="0"
              value={editProject.order}
              onChange={(e) => setEditProject({ ...editProject, order: parseInt(e.target.value) || 0 })}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50"
            />
          </div>

          <Input
            placeholder="GitHub URL"
            value={editProject.github}
            onChange={(e) => setEditProject({ ...editProject, github: e.target.value })}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50"
          />
          <Input
            placeholder="Demo URL"
            value={editProject.demo}
            onChange={(e) => setEditProject({ ...editProject, demo: e.target.value })}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50"
          />
          
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Input
                placeholder="Add technology"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTech()}
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50"
              />
              <Button 
                onClick={addTech} 
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editProject.tech.map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="cursor-pointer bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/80 dark:to-indigo-900/80 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700 hover:from-red-100 hover:to-orange-100 dark:hover:from-red-900/80 dark:hover:to-orange-900/80 transition-all duration-300"
                  onClick={() => removeTech(index)}
                >
                  {tech} <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button 
              onClick={() => onSave(editProject)} 
              disabled={!editProject.title || !editProject.description || !editProject.imageUrl || uploading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button 
              variant="outline" 
              onClick={onCancel} 
              className="flex-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/80 transition-all duration-300"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminPanel