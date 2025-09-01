'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LogOut, Home } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import SkillsManager from '@/components/admin/SkillsManager'
import ProjectsManager from '@/components/admin/ProjectsManager'
import CertificatesManager from '@/components/admin/CertificatesManager'

const AdminPanel = () => {
  const { toast } = useToast()

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your portfolio content
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              View Portfolio
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <SkillsManager />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="certificates">
            <CertificatesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminPanel
