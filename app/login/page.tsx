"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Home } from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Login successful!",
        });

        // Navigate directly to edit page
        router.push("/edit");
      } else {
        toast({
          title: "Error",
          description: data.error || "Login failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 px-4">
      <Card className="w-full max-w-md group relative overflow-hidden border border-gray-200/80 dark:border-gray-700/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ease-out">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
        <div className="relative z-10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
              Admin Login
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Enter your credentials to access the admin panel
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pr-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-blue-500 transition-colors duration-300" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-blue-500 transition-colors duration-300" />
                    )}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/20" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="text-center">
                <a 
                  href="/" 
                  className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group/home"
                >
                  <Home className="h-4 w-4 mr-1 group-hover/home:translate-x-[-2px] transition-transform duration-300" />
                  Return to Home
                </a>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;