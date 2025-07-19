"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code,
  Palette,
  Database,
  Globe,
  Download,
  ArrowRight,
  Menu,
  X,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  const skills = [
    { name: "JavaScript", icon: Code, level: 90 },
    { name: "React", icon: Code, level: 85 },
    { name: "Node.js", icon: Database, level: 80 },
    { name: "Python", icon: Code, level: 75 },
    { name: "UI/UX Design", icon: Palette, level: 70 },
    { name: "MongoDB", icon: Database, level: 80 },
    { name: "Next.js", icon: Globe, level: 85 },
    { name: "TypeScript", icon: Code, level: 80 },
  ]

  const projects = [
    {
      title: "Cryptora",
      description: "A comprehensive cryptocurrency trading platform with real-time market data, portfolio tracking, and secure wallet integration",
      image: "/cryptora-preview.svg",
      tags: ["React", "Node.js", "MongoDB", "WebSocket", "Chart.js", "Stripe"],
      github: "#",
      demo: "#",
    },
    {
      title: "Edunova",
      description: "A comprehensive learning management system with interactive courses, real-time collaboration, and progress tracking for modern education",
      image: "/edunova-preview.svg",
      tags: ["React", "Node.js", "MongoDB", "Express", "Socket.io", "JWT"],
      github: "#",
      demo: "#",
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather app with location-based forecasts",
      image: "/weather-preview.svg",
      tags: ["React", "API Integration", "Chart.js"],
      github: "#",
      demo: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="nav-item hover:text-purple-600 transition-colors">
                About
              </a>
              <a href="#skills" className="nav-item hover:text-purple-600 transition-colors">
                Skills
              </a>
              <a href="#projects" className="nav-item hover:text-purple-600 transition-colors">
                Projects
              </a>
              <a href="#contact" className="nav-item hover:text-purple-600 transition-colors">
                Contact
              </a>
              <ThemeToggle />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-9 h-9 rounded-full"
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col gap-4">
                <a href="#about" className="hover:text-purple-600 transition-colors">
                  About
                </a>
                <a href="#skills" className="hover:text-purple-600 transition-colors">
                  Skills
                </a>
                <a href="#projects" className="hover:text-purple-600 transition-colors">
                  Projects
                </a>
                <a href="#contact" className="hover:text-purple-600 transition-colors">
                  Contact
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="hero-content max-w-4xl mx-auto">
            <div className="hero-avatar w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl">
              <img
                src="/placeholder-user.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Ayush Kumar Sao
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-8">
              Computer Science Student & MERN Stack Developer
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              Hi, I'm Ayush Kumar Sao 👋 I'm a final-year Computer Science student, passionate about building robust web applications and solving complex algorithmic problems. As a MERN stack developer, I craft full-stack projects with clean, scalable code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#projects"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-600 to-blue-600 text-primary-foreground hover:from-purple-700 hover:to-blue-700 h-11 px-8 gap-2"
              >
                View My Work
                <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="/resume.pdf" 
                download
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 gap-2"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="about-image">
              <div className="relative">
                <img
                  src="/placeholder.jpg"
                  alt="About me"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 rounded-2xl"></div>
              </div>
            </div>
            <div className="about-text">
              <h2 className="text-4xl font-bold mb-6 text-slate-800 dark:text-white">
                About Me
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                I'm a final-year Computer Science student, passionate about building robust web applications and solving complex algorithmic problems. As a MERN stack developer, I craft full-stack projects with clean, scalable code. I'm also a dedicated competitive programmer, constantly sharpening my problem-solving skills on platforms like LeetCode and GeeksforGeeks.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                I love transforming ideas into real-world applications, and I'm always exploring new technologies and challenges to grow as a developer. Let's build something great together!
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <span className="text-slate-600 dark:text-slate-300">Bhopal, Madhya Pradesh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-purple-600" />
                  <a 
                    href="mailto:ayushsao32@gmail.com" 
                    className="text-slate-600 dark:text-slate-300 hover:text-purple-600 transition-colors"
                  >
                    ayushsao32@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-white">
              Skills & Expertise
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to life
            </p>
          </div>
          <div className="skills-grid grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="skill-card group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <skill.icon className="h-12 w-12 mx-auto mb-4 text-purple-600 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2 text-slate-800 dark:text-white">{skill.name}</h3>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-2">
                    <div
                      className="skill-progress bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{skill.level}%</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-white">
              Featured Projects
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A selection of my recent work and personal projects
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-slate-800 dark:text-white">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                    <Button size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-800 dark:text-white">
              Let's Work Together
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                      Get In Touch
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-purple-600" />
                        <a 
                          href="mailto:ayushsao32@gmail.com" 
                          className="text-slate-600 dark:text-slate-300 hover:text-purple-600 transition-colors"
                        >
                          ayushsao32@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-purple-600" />
                        <span className="text-slate-600 dark:text-slate-300">+91 9693701652</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-purple-600" />
                        <span className="text-slate-600 dark:text-slate-300">Bhopal, Madhya Pradesh</span>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <a 
                        href="https://github.com/ayushsao" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/ayush-kumar-sao" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a 
                        href="https://x.com/ayush_1256?t=kxNZxV1AWwK3OvQh98v51w&s=09" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                      <a 
                        href="mailto:ayushsao32@gmail.com"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                      Send a Message
                    </h3>
                    <a 
                      href="mailto:ayushsao32@gmail.com" 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-600 to-blue-600 text-primary-foreground hover:from-purple-700 hover:to-blue-700 h-10 px-4 py-2 w-full gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Send Email
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-700">
        <div className="container mx-auto text-center">
          <p className="text-slate-600 dark:text-slate-400">
            © 2025 Ayush Kumar Sao. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
