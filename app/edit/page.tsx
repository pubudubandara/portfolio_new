'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Edit, Trash2, Save, X, LogOut } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Skill {
  _id?: string;
  category: string;
  skills: string[];
  icon: string;
}

interface Project {
  _id?: string;
  title: string;
  description: string;
  tech: string[];
  contribution: string;
  github: string;
  demo: string;
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Portfolio Admin Panel</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="skills">Skills Management</TabsTrigger>
            <TabsTrigger value="projects">Projects Management</TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Skills Management</h2>
                <p className="text-sm text-gray-600">Edit skills within existing categories</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill) => (
                  <SkillCard
                    key={skill._id}
                    skill={skill}
                    onEdit={setEditingSkill}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Projects</h2>
                <Button onClick={() => setIsAddingProject(true)}>
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
            project={editingProject || { title: '', description: '', tech: [], contribution: '', github: '', demo: '' }}
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
const SkillCard = ({ skill, onEdit }: { 
  skill: Skill, 
  onEdit: (skill: Skill) => void
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg">{skill.category}</CardTitle>
      <Button variant="outline" size="sm" onClick={() => onEdit(skill)}>
        <Edit className="w-4 h-4" />
        Edit Skills
      </Button>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {skill.skills.map((s, index) => (
          <Badge key={index} variant="secondary">{s}</Badge>
        ))}
      </div>
    </CardContent>
  </Card>
)

// Project Card Component  
const ProjectCard = ({ project, onEdit, onDelete }: { 
  project: Project, 
  onEdit: (project: Project) => void, 
  onDelete: (id: string) => void 
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg">{project.title}</CardTitle>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
          <Edit className="w-4 h-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Project</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{project.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => project._id && onDelete(project._id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech, index) => (
          <Badge key={index} variant="outline">{tech}</Badge>
        ))}
      </div>
      <p className="text-sm text-gray-600 mb-2">{project.contribution}</p>
    </CardContent>
  </Card>
)

// Skill Editor Component
const SkillEditor = ({ skill, onSave, onCancel }: {
  skill: Skill,
  onSave: (skill: Skill) => void,
  onCancel: () => void
}) => {
  const [editSkill, setEditSkill] = useState(skill)
  const [newSkillItem, setNewSkillItem] = useState('')

  const addSkillItem = () => {
    if (newSkillItem.trim()) {
      setEditSkill({
        ...editSkill,
        skills: [...editSkill.skills, newSkillItem.trim()]
      })
      setNewSkillItem('')
    }
  }

  const removeSkillItem = (index: number) => {
    setEditSkill({
      ...editSkill,
      skills: editSkill.skills.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Edit Skills - {skill.category}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Add New Skill</label>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter skill name"
                value={newSkillItem}
                onChange={(e) => setNewSkillItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkillItem()}
              />
              <Button onClick={addSkillItem} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Current Skills (Click to remove)</label>
            <div className="flex flex-wrap gap-2">
              {editSkill.skills.map((s, index) => (
                <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-red-100"
                       onClick={() => removeSkillItem(index)}>
                  {s} <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={() => onSave(editSkill)} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={onCancel} className="flex-1">
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
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{project._id ? 'Edit' : 'Add'} Project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Project Title"
            value={editProject.title}
            onChange={(e) => setEditProject({ ...editProject, title: e.target.value })}
          />
          <Textarea
            placeholder="Project Description"
            value={editProject.description}
            onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
            rows={3}
          />
          <Textarea
            placeholder="My Contribution (What did you specifically contribute to this project?)"
            value={editProject.contribution}
            onChange={(e) => setEditProject({ ...editProject, contribution: e.target.value })}
            rows={2}
          />
          <Input
            placeholder="GitHub URL"
            value={editProject.github}
            onChange={(e) => setEditProject({ ...editProject, github: e.target.value })}
          />
          <Input
            placeholder="Demo URL"
            value={editProject.demo}
            onChange={(e) => setEditProject({ ...editProject, demo: e.target.value })}
          />
          
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Input
                placeholder="Add technology"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTech()}
              />
              <Button onClick={addTech} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editProject.tech.map((tech, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer"
                       onClick={() => removeTech(index)}>
                  {tech} <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={() => onSave(editProject)} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminPanel
