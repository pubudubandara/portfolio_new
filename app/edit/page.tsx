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
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/15 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.3))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.2))]" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-3xl" />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
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
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <TabsTrigger 
              value="skills" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Skills
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger 
              value="certificates" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Certificates
            </TabsTrigger>
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
    </div>
  )
}

export default AdminPanel
