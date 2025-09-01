'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from '@/components/ui/use-toast'
import { Plus, Edit2, Trash2, Upload, Award, Calendar, ArrowLeft } from 'lucide-react'

interface Certificate {
  _id: string
  name: string
  organization: string
  imageUrl: string
  cloudinaryId: string
  date: string // Format: "MM/YYYY"
  order: number
}

interface CertificateForm {
  name: string
  organization: string
  imageUrl: string
  cloudinaryId: string
  date: string
  order: number
}

export default function EditCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentCertificate, setCurrentCertificate] = useState<Certificate | null>(null)
  const [formData, setFormData] = useState<CertificateForm>({
    name: '',
    organization: '',
    imageUrl: '',
    cloudinaryId: '',
    date: '',
    order: 0
  })

  const router = useRouter()

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const response = await fetch('/api/certificates')
      const data = await response.json()

      if (data.success && Array.isArray(data.data)) {
        setCertificates(data.data)
      } else {
        setCertificates([])
      }
    } catch (error) {
      console.error('Failed to fetch certificates:', error)
      toast({
        title: "Error",
        description: "Failed to fetch certificates",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-certificate-image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          imageUrl: data.data.imageUrl,
          cloudinaryId: data.data.cloudinaryId
        }))
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        })
      } else {
        throw new Error(data.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      organization: '',
      imageUrl: '',
      cloudinaryId: '',
      date: '',
      order: certificates.length
    })
  }

  const openAddDialog = () => {
    resetForm()
    setFormData(prev => ({ ...prev, order: certificates.length }))
    setIsAddDialogOpen(true)
  }

  const openEditDialog = (certificate: Certificate) => {
    setCurrentCertificate(certificate)
    setFormData({
      name: certificate.name,
      organization: certificate.organization,
      imageUrl: certificate.imageUrl,
      cloudinaryId: certificate.cloudinaryId,
      date: certificate.date,
      order: certificate.order
    })
    setIsEditDialogOpen(true)
  }

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.organization.trim() || !formData.imageUrl || !formData.date.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Validate date format (MM/YYYY)
    const datePattern = /^(0[1-9]|1[0-2])\/\d{4}$/
    if (!datePattern.test(formData.date)) {
      toast({
        title: "Error",
        description: "Please enter date in MM/YYYY format",
        variant: "destructive",
      })
      return
    }

    setSaving(true)

    try {
      const isEditing = !!currentCertificate
      const url = '/api/certificates'
      const method = isEditing ? 'PUT' : 'POST'
      const body = isEditing 
        ? { ...formData, _id: currentCertificate._id }
        : formData

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: `Certificate ${isEditing ? 'updated' : 'added'} successfully`,
        })
        
        await fetchCertificates()
        setIsAddDialogOpen(false)
        setIsEditDialogOpen(false)
        setCurrentCertificate(null)
        resetForm()
      } else {
        throw new Error(data.error || 'Save failed')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast({
        title: "Error",
        description: `Failed to ${currentCertificate ? 'update' : 'add'} certificate`,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (certificate: Certificate) => {
    try {
      const response = await fetch(`/api/certificates?id=${certificate._id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Certificate deleted successfully",
        })
        await fetchCertificates()
      } else {
        throw new Error(data.error || 'Delete failed')
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast({
        title: "Error",
        description: "Failed to delete certificate",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const [month, year] = dateString.split('/')
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      return `${monthNames[parseInt(month) - 1]} ${year}`
    } catch (error) {
      return dateString
    }
  }

  const CertificateDialog = ({ 
    isOpen, 
    onOpenChange, 
    title, 
    description 
  }: { 
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
  }) => (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Certificate Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., AWS Certified Solutions Architect"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="organization">Organization *</Label>
            <Input
              id="organization"
              value={formData.organization}
              onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
              placeholder="e.g., Amazon Web Services"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Date (MM/YYYY) *</Label>
            <Input
              id="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              placeholder="e.g., 03/2024"
              pattern="^(0[1-9]|1[0-2])\/\d{4}$"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
              placeholder="0"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Certificate Image *</Label>
            <div className="flex flex-col gap-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              {uploading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Upload className="w-4 h-4 animate-spin" />
                  Uploading...
                </div>
              )}
              {formData.imageUrl && (
                <div className="relative w-full h-32 border rounded-lg overflow-hidden">
                  <Image
                    src={formData.imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || uploading}>
            {saving ? 'Saving...' : 'Save Certificate'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="h-40 bg-gray-200 rounded-lg mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-4" />
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded flex-1" />
                  <div className="h-8 bg-gray-200 rounded flex-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Manage Certificates
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Add, edit, and manage your certificates and achievements
              </p>
            </div>
          </div>
          
          <Button onClick={openAddDialog} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Certificate
          </Button>
        </div>

        {/* Certificates Grid */}
        {certificates.length === 0 ? (
          <div className="text-center py-16">
            <Award className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No certificates yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get started by adding your first certificate
            </p>
            <Button onClick={openAddDialog} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Your First Certificate
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <Card key={certificate._id} className="group relative">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={certificate.imageUrl}
                    alt={certificate.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-lg line-clamp-2">
                    {certificate.name}
                  </CardTitle>
                  <CardDescription className="font-semibold">
                    {certificate.organization}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(certificate.date)}
                    </Badge>
                    <Badge variant="outline">
                      Order: {certificate.order}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(certificate)}
                      className="flex-1"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="flex-1">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Certificate</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{certificate.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(certificate)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add Certificate Dialog */}
        <CertificateDialog
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          title="Add Certificate"
          description="Add a new certificate to showcase your achievements"
        />

        {/* Edit Certificate Dialog */}
        <CertificateDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          title="Edit Certificate"
          description="Update certificate information"
        />
      </div>
    </div>
  )
}