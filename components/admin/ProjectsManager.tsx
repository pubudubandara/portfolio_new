'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

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

interface ProjectEditorProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const ProjectEditor: React.FC<ProjectEditorProps> = ({ project, onSave, onCancel }) => {
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

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => (
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

export const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/projects')
      const data = await response.json()

      if (data.success) setProjects(data.data)
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch projects', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

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
        fetchProjects()
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
        fetchProjects()
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
      <div className="flex items-center justify-center py-8">
        <div className="text-lg bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent font-bold">
          Loading projects...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
          Projects Management
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
  )
}

export default ProjectsManager
