"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Moon,
  Sun,
  Download,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Menu,
  X,
  Code,
  Database,
  Wrench,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import ScrollSpyNavigation from "@/components/scroll-spy-navigation";
import AnimatedSection from "@/components/AnimatedSection";
import { TypeAnimation } from "react-type-animation";

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "resume",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  const skills = {
    frontend: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
    backend: ["Node.js", "Express", "MongoDB"],
    tools: ["Git", "VS Code", "Postman"],
    soft: ["Teamwork", "Communication", "Problem Solving"],
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with user authentication, product management, and payment integration.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      github: "#",
      demo: "#",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team collaboration features.",
      tech: ["Next.js", "Tailwind CSS", "Firebase"],
      github: "#",
      demo: "#",
    },
    {
      title: "Weather Dashboard",
      description:
        "A responsive weather dashboard with location-based forecasts and interactive charts.",
      tech: ["React", "Chart.js", "Weather API"],
      github: "#",
      demo: "#",
    },
    {
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website showcasing projects and skills with dark mode support.",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
      github: "#",
      demo: "#",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl">Pubudu Bandara</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors hover:text-primary ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Side Scroll Spy Navigation */}
      <ScrollSpyNavigation sections={navItems} />

      {/* Hero Section */}
      <AnimatedSection animation="fadeUp">
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center ">
            <div className="mb-8">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Pubudu Bandara"
                width={200}
                height={200}
                className="rounded-full mx-auto mb-6 shadow-lg"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Pubudu Bandara
            </h1>
            {/* <p className="text-xl sm:text-2xl text-muted-foreground mb-8">
            Undergraduate in Information Technology | University of Moratuwa
          </p> */}
            <TypeAnimation
              className="text-xl sm:text-2xl text-muted-foreground mb-8"
              sequence={["Undergraduate in Information Technology🎓",2000, "University of Moratuwa", 2000, "Fullstack Developer 💻", 2000]}
              repeat={Infinity}
              deletionSpeed={90}
              speed={80}
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <Button size="lg" className="shadow-lg">
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection animation="fadeLeft">
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I'm a passionate Information Technology student at the
                  University of Moratuwa, currently pursuing my BSc (Hons) in
                  IT. I have a strong interest in modern web development
                  technologies and artificial intelligence.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  My journey in technology has led me to specialize in the MERN
                  stack, where I enjoy building full-stack applications that
                  solve real-world problems. I'm always eager to learn new
                  technologies and take on challenging projects.
                </p>
              </div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Education & Interests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">University</h4>
                    <p className="text-muted-foreground">
                      BSc (Hons) in Information Technology
                    </p>
                    <p className="text-muted-foreground">
                      University of Moratuwa
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Key Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Web Development</Badge>
                      <Badge variant="secondary">Artificial Intelligence</Badge>
                      <Badge variant="secondary">MERN Stack</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection animation="fadeRight">
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Skills & Technologies
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="mr-2 h-5 w-5 text-primary" />
                    Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.map((skill) => (
                      <Badge key={skill} variant="default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="mr-2 h-5 w-5 text-primary" />
                    Backend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.map((skill) => (
                      <Badge key={skill} variant="default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wrench className="mr-2 h-5 w-5 text-primary" />
                    Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map((skill) => (
                      <Badge key={skill} variant="default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Soft Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.soft.map((skill) => (
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
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection animation="fadeLeft">
        <section
          id="projects"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Resume Section */}
      <AnimatedSection animation="fadeLeft">
        <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">Resume</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Download my complete resume to learn more about my experience,
              education, and achievements.
            </p>
            <Button size="lg" className="shadow-lg" asChild>
              <a href="/Pubudu_CV.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </a>
            </Button>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection animation="fadeRight">
        <section
          id="contact"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Get In Touch
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-primary" />
                    <span>pubudu@example.com</span>
                  </div>
                  <div className="flex space-x-4 mt-6">
                    <Button size="icon" variant="outline" asChild>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button size="icon" variant="outline" asChild>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    I'd love to hear from you. Send me a message and I'll
                    respond as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Input placeholder="Your Name" />
                    </div>
                    <div>
                      <Input type="email" placeholder="Your Email" />
                    </div>
                    <div>
                      <Textarea placeholder="Your Message" rows={4} />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Back to Top Button */}

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Pubudu Bandara. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
