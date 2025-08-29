"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Edit,
  Users,
  FileText,
  BarChart3,
  LogOut,
  Home,
  Shield,
  Database,
  Image
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminStats {
  totalProjects: number;
  totalSkills: number;
  totalUsers: number;
  totalContributions: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalProjects: 0,
    totalSkills: 0,
    totalUsers: 0,
    totalContributions: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        router.push('/login');
      }
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchStats = async () => {
    try {
      const [projectsRes, skillsRes, usersRes, contributionsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/users'),
        fetch('/api/contributions')
      ]);

      const projects = projectsRes.ok ? await projectsRes.json() : [];
      const skills = skillsRes.ok ? await skillsRes.json() : [];
      const users = usersRes.ok ? await usersRes.json() : [];
      const contributions = contributionsRes.ok ? await contributionsRes.json() : [];

      setStats({
        totalProjects: Array.isArray(projects) ? projects.length : 0,
        totalSkills: Array.isArray(skills) ? skills.length : 0,
        totalUsers: Array.isArray(users) ? users.length : 0,
        totalContributions: Array.isArray(contributions) ? contributions.length : 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const adminActions = [
    {
      title: "Content Management",
      description: "Manage projects, skills, and contributions",
      icon: Edit,
      path: "/edit",
      color: "bg-blue-500",
      stats: `${stats.totalProjects} projects, ${stats.totalSkills} skills`
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: Users,
      path: "/admin/users",
      color: "bg-green-500",
      stats: `${stats.totalUsers} users`
    },
    {
      title: "Media Library",
      description: "Manage uploaded images and files",
      icon: Image,
      path: "/admin/media",
      color: "bg-purple-500",
      stats: "View all uploads"
    },
    {
      title: "Analytics",
      description: "View site statistics and insights",
      icon: BarChart3,
      path: "/admin/analytics",
      color: "bg-orange-500",
      stats: "Coming soon"
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Portfolio Management System
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/')}
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>View Site</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Projects
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {isLoading ? "..." : stats.totalProjects}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Settings className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Skills
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {isLoading ? "..." : stats.totalSkills}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {isLoading ? "..." : stats.totalUsers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Database className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Contributions
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {isLoading ? "..." : stats.totalContributions}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminActions.map((action, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => router.push(action.path)}
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 ${action.color} rounded-lg group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {action.stats}
                  </Badge>
                  <Button size="sm" className="group-hover:bg-blue-600 transition-colors">
                    Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() => router.push('/edit')}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Edit Content</div>
                    <div className="text-xs text-gray-500">Manage portfolio content</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() => router.push('/')}
                >
                  <Home className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">View Portfolio</div>
                    <div className="text-xs text-gray-500">See live website</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Logout</div>
                    <div className="text-xs text-gray-500">Sign out securely</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
