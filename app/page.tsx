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
  const [isLoading, setIsLoading] = useState(true)
  const fullName = "Ayush Kumar"

  // Handle hydration and preloader
  useEffect(() => {
    console.log('Portfolio mounted, starting preloader...')
    setMounted(true)
    // Simulate loading time - increased duration for better visibility
    const timer = setTimeout(() => {
      console.log('Preloader finished, showing portfolio...')
      setIsLoading(false)
    }, 4000) // Increased from 2500ms to 4000ms
    return () => clearTimeout(timer)
  }, [])

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  // Show preloader
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-slate-950 dark:via-purple-950 dark:to-indigo-950">
        {/* Main preloader content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          {/* Simple loading spinner */}
          <div className="relative mb-12">
            {/* Outer spinning ring */}
            <div className="w-32 h-32 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>
            {/* Center glowing dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
            </div>
          </div>

          {/* Simple name display */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              AYUSH KUMAR
            </h1>
            <p className="text-xl text-purple-300 animate-pulse">Computer Science Student & MERN Stack Developer</p>
          </div>

          {/* Simple progress indicator */}
          <div className="w-80 max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-cyan-400 font-semibold">Loading Portfolio...</span>
              <span className="text-pink-400 font-semibold">Please wait...</span>
            </div>
            <div className="w-full h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-purple-500/30"></div>
            </div>
          </div>

          {/* Simple loading text */}
          <div className="mt-8">
            <p className="text-white/70 animate-pulse">
              Preparing your experience...
            </p>
          </div>
        </div>
      </div>
    )
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
              AKS
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="nav-item hover:text-purple-600 transition-colors">
                About
              </a>
              <a href="#skills" className="nav-item hover:text-purple-600 transition-colors">
                Skills
              </a>
              <a href="#resume" className="nav-item hover:text-purple-600 transition-colors">
                Resume
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
                <a href="#resume" className="hover:text-purple-600 transition-colors">
                  Resume
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
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Moving Background Objects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating circles */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-purple-300/20 rounded-full animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-300/20 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-emerald-300/20 rounded-full animate-float-fast"></div>
          <div className="absolute bottom-20 right-40 w-12 h-12 bg-pink-300/20 rounded-full animate-float-slow"></div>
          <div className="absolute top-1/2 left-5 w-14 h-14 bg-yellow-300/20 rounded-full animate-float-medium"></div>
          <div className="absolute top-1/3 right-10 w-18 h-18 bg-indigo-300/20 rounded-full animate-float-fast"></div>
          
          {/* Floating triangles */}
          <div className="absolute top-60 left-1/4 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-purple-300/30 animate-float-medium"></div>
          <div className="absolute top-80 right-1/4 w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-blue-300/30 animate-float-fast"></div>
          <div className="absolute bottom-1/3 left-1/2 w-0 h-0 border-l-10 border-r-10 border-b-20 border-l-transparent border-r-transparent border-b-emerald-300/20 animate-float-slow"></div>
          
          {/* Floating squares */}
          <div className="absolute top-32 right-1/3 w-8 h-8 bg-gradient-to-br from-purple-300/20 to-blue-300/20 transform rotate-45 animate-float-slow"></div>
          <div className="absolute bottom-60 left-1/3 w-6 h-6 bg-gradient-to-br from-emerald-300/20 to-pink-300/20 transform rotate-45 animate-float-medium"></div>
          <div className="absolute top-2/3 right-1/5 w-10 h-10 bg-gradient-to-br from-yellow-300/20 to-red-300/20 transform rotate-45 animate-float-fast"></div>
          
          {/* Floating lines/rectangles */}
          <div className="absolute top-1/4 left-1/5 w-16 h-2 bg-gradient-to-r from-purple-300/30 to-transparent rounded-full animate-float-medium"></div>
          <div className="absolute bottom-1/4 right-1/5 w-20 h-1 bg-gradient-to-l from-blue-300/30 to-transparent rounded-full animate-float-slow"></div>
          
          {/* Additional decorative elements */}
          <div className="absolute top-16 left-1/2 w-3 h-3 bg-cyan-300/40 rounded-full animate-float-fast"></div>
          <div className="absolute bottom-16 left-1/4 w-4 h-4 bg-rose-300/40 rounded-full animate-float-medium"></div>
          <div className="absolute top-3/4 right-1/3 w-5 h-5 bg-violet-300/40 rounded-full animate-float-slow"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="hero-content max-w-4xl mx-auto">
            <div className="hero-avatar w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl">
              <img
                src="/placeholder-user.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 min-h-[1.2em]">
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                {fullName.split(' ').map((word, wordIndex) => (
                  <div key={wordIndex} className="flex">
                    {word.split('').map((letter, letterIndex) => {
                      const totalIndex = fullName.slice(0, fullName.indexOf(word) + letterIndex).length
                      const colors = [
                        'text-purple-600',
                        'text-blue-600', 
                        'text-emerald-600',
                        'text-pink-600',
                        'text-indigo-600',
                        'text-cyan-600',
                        'text-violet-600',
                        'text-teal-600',
                        'text-rose-600',
                        'text-orange-600',
                        'text-yellow-600',
                        'text-lime-600',
                        'text-sky-600',
                        'text-fuchsia-600',
                        'text-amber-600'
                      ]
                      return (
                        <span
                          key={letterIndex}
                          className={`inline-block animate-wave-letter ${colors[totalIndex % colors.length]} hover:scale-125 transition-transform cursor-pointer font-extrabold`}
                          style={{
                            animationDelay: `${totalIndex * 0.15}s`,
                            transformOrigin: 'center bottom',
                            animationDuration: '2.5s'
                          }}
                        >
                          {letter}
                        </span>
                      )
                    })}
                    {wordIndex < fullName.split(' ').length - 1 && (
                      <span className="inline-block w-2 sm:w-4 animate-wave-letter" 
                            style={{animationDelay: `${fullName.indexOf(' ', fullName.indexOf(word)) * 0.15}s`}}>
                        &nbsp;
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-8">
              Computer Science Student & MERN Stack Developer
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              Hi, I'm Ayush Kumar 👋 I'm a final-year Computer Science student, passionate about building robust web applications and solving complex algorithmic problems. As a MERN stack developer, I craft full-stack projects with clean, scalable code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  // Create a download link for the resume
                  const link = document.createElement('a');
                  link.href = '/resume-ayush-kumar-sao.pdf';
                  link.download = 'Ayush_Kumar_Sao_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
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

      {/* Resume Section */}
      <section id="resume" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Resume
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              My educational background, experience, and achievements
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-3"></div>
                Education
              </h3>
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-slate-800 dark:text-white">
                      Bachelor of Technology - Computer Science
                    </h4>
                    <Badge variant="secondary">2022-2026</Badge>
                  </div>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                    RGPV University
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Currently pursuing B.Tech in Computer Science Engineering with focus on Data Structures, Algorithms, Web Development, and Software Engineering.
                  </p>
                  <div className="mt-3">
                    <Badge variant="outline">CGPA: 7.35/10</Badge>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-slate-800 dark:text-white">
                      Higher Secondary Education
                    </h4>
                    <Badge variant="secondary">2020-2022</Badge>
                  </div>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                    Science Stream (PCM + Computer Science)
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Completed 12th grade with Mathematics, Physics, Chemistry, and Computer Science.
                  </p>
                  <div className="mt-3">
                    <Badge variant="outline">Percentage: 84%</Badge>
                  </div>
                </Card>
              </div>
            </div>

            {/* Experience & Projects */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-3"></div>
                Experience & Projects
              </h3>
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-slate-800 dark:text-white">
                      MERN Stack Developer
                    </h4>
                    <Badge variant="secondary">2023-Present</Badge>
                  </div>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                    Personal Projects & Freelance
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">
                    Developing full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Created multiple projects including cryptocurrency trading platform and learning management system.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>React.js</Badge>
                    <Badge>Node.js</Badge>
                    <Badge>MongoDB</Badge>
                    <Badge>Express.js</Badge>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-slate-800 dark:text-white">
                      Competitive Programming
                    </h4>
                    <Badge variant="secondary">2022-Present</Badge>
                  </div>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                    LeetCode & GeeksforGeeks
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">
                    Active problem solver with focus on Data Structures and Algorithms. Solved 1000+ problems across various platforms.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Data Structures</Badge>
                    <Badge>Algorithms</Badge>
                    <Badge>Problem Solving</Badge>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-3"></div>
              Certifications & Achievements
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                  MERN Stack Development
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Self-taught full-stack development with practical project implementation
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                  Database Management
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  MongoDB, MySQL, and database design expertise
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                  Web Development
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Modern web technologies and responsive design principles
                </p>
              </Card>
            </div>
          </div>

          {/* Download Resume Button */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/resume-ayush-kumar-sao.pdf';
                link.download = 'Ayush_Kumar_Sao_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Full Resume
            </Button>
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
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 text-white">
        <div className="container mx-auto px-6 py-12">
          {/* Footer Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About Section */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Ayush Kumar
              </h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Final-year Computer Science student & MERN stack developer passionate about building robust web applications and solving complex algorithmic problems. I love transforming ideas into real-world applications through clean, scalable code.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/ayushsao" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white h-9 w-9"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/ayush-kumar-sao" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white h-9 w-9"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a 
                  href="https://x.com/ayush_1256?t=kxNZxV1AWwK3OvQh98v51w&s=09" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-green-400 text-green-400 hover:bg-green-400 hover:text-white h-9 w-9"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="mailto:ayushsao32@gmail.com"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white h-9 w-9"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-300">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-slate-300 hover:text-purple-400 transition-colors">About Me</a></li>
                <li><a href="#skills" className="text-slate-300 hover:text-purple-400 transition-colors">Skills</a></li>
                <li><a href="#projects" className="text-slate-300 hover:text-purple-400 transition-colors">Projects</a></li>
                <li><a href="#contact" className="text-slate-300 hover:text-purple-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-300">Get In Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-purple-400" />
                  <a 
                    href="mailto:ayushsao32@gmail.com" 
                    className="text-slate-300 text-sm hover:text-purple-400 transition-colors"
                  >
                    ayushsao32@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-purple-400" />
                  <span className="text-slate-300 text-sm">+91 9693701652</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  <span className="text-slate-300 text-sm">Bhopal, Madhya Pradesh</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Code className="h-4 w-4 text-white" />
                </div>
                <p className="text-slate-400 text-sm">
                  © 2025 Ayush Kumar. Crafted with ❤️ and lots of ☕
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  Available for freelance
                </span>
                <span className="hidden md:block">•</span>
                <span>Made with Next.js & Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient line */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500"></div>
      </footer>
    </div>
  )
}
