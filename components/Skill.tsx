'use client'

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Wrench, Box, Cpu, Globe, Smartphone, Server } from "lucide-react";

interface Skill {
  _id: string;
  category: string;
  skills: string[];
  icon: string;
}

const getIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Code,
    Database,
    Wrench,
    Box,
    Cpu,
    Globe,
    Smartphone,
    Server,
  };
  return icons[iconName] || Code;
};

export const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const data = await response.json();

      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setSkills(data.data);
      } else {
        setSkills([]); 
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
      setSkills([]); 
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bg-muted/30 via-cyan-400/10 to-bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Skills & Technologies
          </h2>
          <div className="text-center">Loading skills...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bg-muted/30 via-cyan-400/10 to-bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Skills & Technologies
        </h2>
        {skills.length === 0 ? (
          <p className="text-center text-muted-foreground">No skills to display at the moment.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill) => {
              const IconComponent = getIcon(skill.icon);
              return (
                <Card key={skill._id} className="shadow-blue-500/50 hover:scale-105 transition-all duration-300 ease-in-out">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <IconComponent className="mr-2 h-5 w-5 text-primary" />
                      {skill.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skill.skills.map((skillItem) => (
                        <Badge key={skillItem} variant="default">
                          {skillItem}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};