'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Text Section */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              I'm a passionate Information Technology student at the University
              of Moratuwa, currently pursuing my BSc (Hons) in IT. I have a
              strong interest in modern web development technologies and
              artificial intelligence.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              My journey in technology has led me to specialize in the MERN
              stack, where I enjoy building full-stack applications that solve
              real-world problems. I'm always eager to learn new technologies and
              take on challenging projects.
            </p>
          </div>

          {/* Right Card Section */}
          <div className="relative">
            {/* Main Card with all effects applied directly */}
            <Card className="group relative overflow-hidden border border-gray-200/80 dark:border-gray-700/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02]">
              {/* Gradient border effect - now inside the card */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
              <div className="relative z-10">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                    Education & Interests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">University</h4>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      BSc (Hons) in Information Technology
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">University of Moratuwa</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">School</h4>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      St. Sylvester's College Kandy
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Key Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        variant="secondary"
                        className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/80 dark:to-indigo-900/80 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700 hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-300 text-xs font-semibold px-3 py-1"
                      >
                        Electronics
                      </Badge>
                      <Badge 
                        variant="secondary"
                        className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/80 dark:to-indigo-900/80 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700 hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-300 text-xs font-semibold px-3 py-1"
                      >
                        UI design
                      </Badge>
                      <Badge 
                        variant="secondary"
                        className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/80 dark:to-indigo-900/80 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700 hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-300 text-xs font-semibold px-3 py-1"
                      >
                        Travelling
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};