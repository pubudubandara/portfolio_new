'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, Save } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Certificate {
  _id?: string;
  name: string;
  organization: string;
  date: string;
  imageUrl: string;
  cloudinaryId: string;
  order: number;
}

const CertificatesManager = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null)
  const [isAddingCertificate, setIsAddingCertificate] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCertificateImage, setSelectedCertificateImage] = useState<Certificate | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchCertificates()
  }, [])

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const [month, year] = dateString.split('/')
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
      const monthIndex = parseInt(month) - 1
      if (monthIndex >= 0 && monthIndex < 12) {
        return `${monthNames[monthIndex]} ${year}`
      }
      return dateString
    } catch (error) {
      return dateString
    }
  };

  const fetchCertificates = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/certificates')
      if (response.ok) {
        const data = await response.json()
        // Handle different response formats
        if (Array.isArray(data)) {
          setCertificates(data)
        } else if (data && Array.isArray(data.data)) {
          setCertificates(data.data)
        } else {
          setCertificates([])
        }
      } else {
        setCertificates([])
        toast({ title: 'Error', description: 'Failed to fetch certificates', variant: 'destructive' })
      }
    } catch (error) {
      setCertificates([])
      toast({ title: 'Error', description: 'Failed to fetch certificates', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveCertificate = async (certificate: Certificate) => {
    try {
      const method = certificate._id ? 'PUT' : 'POST'
      const response = await fetch('/api/certificates', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certificate),
      })

      if (response.ok) {
        toast({ title: 'Success', description: `Certificate ${certificate._id ? 'updated' : 'created'} successfully!` })
        fetchCertificates()
        setEditingCertificate(null)
        setIsAddingCertificate(false)
      } else {
        toast({ title: 'Error', description: 'Failed to save certificate', variant: 'destructive' })
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save certificate', variant: 'destructive' })
    }
  }

  const handleDeleteCertificate = async (id: string) => {
    try {
      const response = await fetch(`/api/certificates?id=${id}`, { method: 'DELETE' })
      if (response.ok) {
        toast({ title: 'Success', description: 'Certificate deleted successfully!' })
        fetchCertificates()
      } else {
        toast({ title: 'Error', description: 'Failed to delete certificate', variant: 'destructive' })
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete certificate', variant: 'destructive' })
    }
  }

  const emptyCertificate: Certificate = {
    name: '',
    organization: '',
    date: '',
    imageUrl: '',
    cloudinaryId: '',
    order: 0
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certificates Management</h2>
        <Button
          onClick={() => setIsAddingCertificate(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Certificate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates && certificates.length > 0 ? (
          certificates.map((certificate) => (
            <Card key={certificate._id || certificate.name} className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div 
                  className="aspect-[4/3] relative mb-4 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedCertificateImage(certificate)}
                >
                  <Image
                    src={certificate.imageUrl}
                    alt={certificate.name}
                    fill
                    className="object-cover"
                  />
                </div>
              
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white line-clamp-1">
                {certificate.name}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
                {certificate.organization}
              </p>
              
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                {formatDate(certificate.date)}
              </p>

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => setEditingCertificate(certificate)}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/50">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
                        Delete Certificate
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-700 dark:text-gray-300">
                        Are you sure you want to delete "{certificate.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/80 transition-all duration-300">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteCertificate(certificate._id!)}
                        className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white transition-all duration-300"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <p className="text-lg font-medium mb-2">No certificates found</p>
              <p className="text-sm">Click "Add Certificate" to create your first certificate.</p>
            </div>
          </div>
        )}
      </div>

      {/* Certificate Editor */}
      {(editingCertificate || isAddingCertificate) && (
        <CertificateEditor
          certificate={editingCertificate || emptyCertificate}
          onSave={handleSaveCertificate}
          onCancel={() => {
            setEditingCertificate(null)
            setIsAddingCertificate(false)
          }}
        />
      )}

      {/* Certificate Image Modal */}
      {selectedCertificateImage && (
        <Dialog open={!!selectedCertificateImage} onOpenChange={() => setSelectedCertificateImage(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 dark:from-white dark:via-purple-100 dark:to-white bg-clip-text text-transparent">
                {selectedCertificateImage.name}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-full max-w-3xl aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={selectedCertificateImage.imageUrl}
                  alt={selectedCertificateImage.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedCertificateImage.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedCertificateImage.organization}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {formatDate(selectedCertificateImage.date)}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Certificate Editor Component
const CertificateEditor = ({ certificate, onSave, onCancel }: {
  certificate: Certificate
  onSave: (certificate: Certificate) => void
  onCancel: () => void
}) => {
  const [editCertificate, setEditCertificate] = useState<Certificate>(certificate)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  // Update state when certificate prop changes
  useEffect(() => {
    setEditCertificate(certificate)
  }, [certificate])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload-certificate-image', {
        method: 'POST',
        body: formData,
      })
      
      const data = await response.json()
      
      if (data.success) {
        setEditCertificate(prev => ({
          ...prev,
          imageUrl: data.data.imageUrl,
          cloudinaryId: data.data.cloudinaryId
        }))
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 dark:from-white dark:via-purple-100 dark:to-white bg-clip-text text-transparent">
            {certificate._id ? 'Edit Certificate' : 'Add New Certificate'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Certificate Name *
            </label>
            <Input
              value={editCertificate.name || ''}
              onChange={(e) => setEditCertificate(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Certificate name"
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Provider *
            </label>
            <Input
              value={editCertificate.organization || ''}
              onChange={(e) => setEditCertificate(prev => ({ ...prev, organization: e.target.value }))}
              placeholder="Certificate provider (e.g., Google, AWS, Microsoft)"
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Issued (MM/YYYY) *
            </label>
            <Input
              type="text"
              value={editCertificate.date || ''}
              onChange={(e) => setEditCertificate(prev => ({ ...prev, date: e.target.value }))}
              placeholder="MM/YYYY (e.g., 12/2023)"
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Certificate Image *
            </label>
            <div className="flex items-center space-x-4">
              {editCertificate.imageUrl && (
                <div className="w-32 h-32 relative">
                  <Image
                    src={editCertificate.imageUrl}
                    alt="Certificate preview"
                    fill
                    className="object-cover rounded-lg"
                    sizes="128px"
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
                {uploading && <p className="text-sm text-purple-600 mt-1">Uploading...</p>}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Display Order
            </label>
            <Input
              type="number"
              value={editCertificate.order || 0}
              onChange={(e) => setEditCertificate(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50"
            />
          </div>

          <div className="flex space-x-2">
            <Button 
              onClick={() => onSave(editCertificate)} 
              disabled={!editCertificate.name || !editCertificate.organization || !editCertificate.date || !editCertificate.imageUrl || uploading}
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

export default CertificatesManager
