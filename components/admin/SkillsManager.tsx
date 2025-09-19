'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Skill {
  _id?: string;
  name: string;
  imageUrl: string;
  cloudinaryId: string;
  order: number;
}

interface SkillEditorProps {
  skill: Skill;
  onSave: (skill: Skill) => void;
  onCancel: () => void;
}

const SkillEditor: React.FC<SkillEditorProps> = ({ skill, onSave, onCancel }) => {
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
              disabled={!editSkill.name || !editSkill.imageUrl || uploading}
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

interface SkillCardProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onEdit, onDelete }) => (
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

export const SkillsManager: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/skills')
      const data = await response.json()

      if (data.success && data.data.length > 0) {
        setSkills(data.data)
      } else {
        // Initialize default skills if none exist
        await initializeDefaultSkills()
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch skills', variant: 'destructive' })
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
        fetchSkills()
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
        fetchSkills()
        toast({ title: 'Success', description: 'Skill deleted successfully!' })
      } else {
        toast({ title: 'Error', description: data.error, variant: 'destructive' })
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete skill', variant: 'destructive' })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent font-bold">
          Loading skills...
        </div>
      </div>
    )
  }

  return (
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

      {/* Skill Edit Modal */}
      {editingSkill && (
        <SkillEditor
          skill={editingSkill}
          onSave={handleSaveSkill}
          onCancel={() => setEditingSkill(null)}
        />
      )}
    </div>
  )
}

export default SkillsManager
