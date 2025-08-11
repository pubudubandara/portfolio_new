import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Wrench, Box, Cpu } from "lucide-react";

export const Skills = () => {
  const skills = {
    "Programming Languages": ["C","Java", "JavaScript", "TypeScript"],
    "Web Development": ["HTML", "CSS", "Next.js", "React", "Node.js", "Express.js", "Tailwind CSS"],
    "Database": ["MongoDB", "MySQL"],
    "Other": ["Git", "Photoshop", "Figma", "Docker"]
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bg-muted/30 via-cyan-400/10 to-bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Skills & Technologies
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="shadow-blue-500/50 hover:scale-105 transition-all duration-300 ease-in-out">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 h-5 w-5 text-primary" />
                Programming Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills["Programming Languages"].map((skill) => (
                  <Badge key={skill} variant="default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-blue-500/50 hover:scale-105 transition-all duration-300 ease-in-out">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cpu className="mr-2 h-5 w-5 text-primary" />
                Web Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills["Web Development"].map((skill) => (
                  <Badge key={skill} variant="default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-blue-500/50 hover:scale-105 transition-all duration-300 ease-in-out">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-primary" />
                Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills["Database"].map((skill) => (
                  <Badge key={skill} variant="default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-blue-500/50 hover:scale-105 transition-all duration-300 ease-in-out">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Box className="mr-2 h-5 w-5 text-primary" />
                Other
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills["Other"].map((skill) => (
                  <Badge key={skill} variant="default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};