"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Github,
  Linkedin,
  Phone,
  Instagram,
  Twitter,
  BookOpen,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const contactInfo = contactInfoRef.current;

    if (!section || !title || !form || !contactInfo) return;

    // Set initial states
    gsap.set([title], { opacity: 0, y: 50 });
    gsap.set([form, contactInfo], { opacity: 0, y: 80 });

    // Create scroll-triggered animations
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    timeline
      .to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        [form, contactInfo],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.4"
      );

    return () => {
      timeline.kill();
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast({
          title: "Error",
          description:
            data.error || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent mb-4"
          >
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            I'm always open to discussing new opportunities, interesting
            projects, or just having a chat about technology and innovation.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info Section */}
          <div ref={contactInfoRef} className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {/* Phone with icon */}
                <div className="flex items-center p-5 rounded-lg bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/50 dark:border-blue-800/30">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 mr-4">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    070 31 43 723
                  </p>
                </div>

                {/* Email with icon */}
                <div className="flex items-center p-5 rounded-lg bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/50 dark:border-blue-800/30">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 mr-4">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <a
                    href="mailto:pubudumb@gmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    pubudumb@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Follow Me
              </h4>
              <div className="flex space-x-4">
                <Button
                  size="icon"
                  variant="outline"
                  className="w-11 h-11 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/70 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/pubudu-bandara/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="w-11 h-11 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/70 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300"
                  asChild
                >
                  <a
                    href="https://github.com/pubudubandara"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="w-11 h-11 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/70 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300"
                  asChild
                >
                  <a
                    href="https://medium.com/@pubudumb"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookOpen className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div ref={formRef} className="relative">
            {/* Form Card */}
            <Card className="group relative overflow-hidden border border-gray-200/80 dark:border-gray-700/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02]">
              {/* Gradient border effect - now inside the card */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-cyan-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
              <div className="relative z-10">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 mb-2">
                    Send a Message
                  </CardTitle>
                  <CardDescription className="text-gray-700 dark:text-gray-300 font-medium">
                    Fill out the form below and I'll get back to you soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-11 border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-11 border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors min-h-[100px]"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
