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
import { useGSAP } from "@/hooks/use-gsap"
import { useLenis } from "@/hooks/use-lenis"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSending, setIsSending] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  const fullName = "Ayush Kumar Sao"
  const { gsap, ScrollTrigger } = useGSAP()
  const lenis = useLenis()
  const heroRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const resumeRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Play click sound
  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  const skills = [
    { name: "C++", icon: Code, level: 90 },
    { name: "JavaScript", icon: Code, level: 90 },
    { name: "Python", icon: Code, level: 85 },
    { name: "React.js", icon: Code, level: 90 },
    { name: "Next.js", icon: Globe, level: 90 },
    { name: "Node.js", icon: Database, level: 85 },
    { name: "MongoDB", icon: Database, level: 85 },
    { name: "Tailwind CSS", icon: Palette, level: 90 },
  ]

  const projects = [
    {
      title: "EssayTute",
      description: "AI-powered essay evaluator with real-time grammar scoring and analytical feedback. Achieved 95% evaluation accuracy and improved assessment efficiency for users.",
      image: "/edunova-preview1.png",
      tags: ["Next.js", "Tailwind CSS", "Firebase"],
      github: "#",
      demo: "#",
    },
    {
      title: "Cryptora",
      description: "Real-time cryptocurrency tracker using CoinGecko API and Chart.js. Optimized Redux state management, reducing chart rendering time by 15%.",
      image: "/cryptora-preview.jpg",
      tags: ["React.js", "Redux", "Chart.js"],
      github: "#",
      demo: "#",
    },
  ]

  // Handle hydration and preloader
  useEffect(() => {
    console.log('Portfolio mounted, starting preloader...')
    setMounted(true)
    // Initialize audio
    audioRef.current = new Audio('data:audio/wav;base64,UklGRhgBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfQAAAAAAAEAAgADAAQABQAGAAcACAAJAAoACwAMAA0ADgAPABAAEQASABMAFAAVABYAFwAYABkAGgAbABwAHQAeAB8AIAAhACIAIwAkACUAJgAnACgAKQAqACsALAAtAC4ALwAwADEAMgAzADQANQA2ADcAOAA5ADo=')
    audioRef.current.volume = 0.3
    // Quick preloader - 1.5 seconds
    const timer = setTimeout(() => {
      console.log('Preloader finished, showing portfolio...')
      setIsLoading(false)
    }, 1500) // Reduced from 4000ms to 1500ms
    return () => clearTimeout(timer)
  }, [])

  // Custom cursor effect (desktop only)
  useEffect(() => {
    // Check if device is mobile/tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
    
    if (isMobile) return // Skip cursor on mobile

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      
      if (cursorRef.current && cursorDotRef.current && gsap) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: "power2.out"
        })
        
        gsap.to(cursorDotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
        })
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Add cursor effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]')
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [gsap, isLoading])

  // GSAP Animations (mobile-safe)
  useEffect(() => {
    if (!gsap || !ScrollTrigger || isLoading) return

    // Detect mobile for simplified animations
    const isMobile = window.innerWidth < 768

    // Sync Lenis with GSAP ScrollTrigger
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
    }

    // Hero section animations
    gsap.from('.hero-avatar', {
      scale: 0,
      rotation: isMobile ? 180 : 360,
      duration: isMobile ? 0.8 : 1,
      ease: 'back.out(1.7)',
      delay: 0.2
    })

    // Continuous floating animation for avatar (reduced on mobile)
    gsap.to('.hero-avatar', {
      y: isMobile ? -8 : -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 1.5
    })

    gsap.from('.hero-content h1', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.5
    })

    gsap.from('.hero-content h2', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.7
    })

    gsap.from('.hero-content p', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.9
    })

    gsap.from('.hero-content .flex', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 1.1
    })

    // Floating shapes animation (reduced on mobile)
    if (!isMobile) {
      gsap.to('.animate-float-slow', {
        y: '-=20',
        x: '-=10',
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to('.animate-float-medium', {
        y: '-=30',
        x: '+=15',
        rotation: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to('.animate-float-fast', {
        y: '-=40',
        x: '-=20',
        rotation: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }

    // Skills cards animation with ScrollTrigger and floating
    gsap.utils.toArray('.skill-card').forEach((card: any, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out'
      })

      // Add continuous floating to skill cards
      gsap.to(card, {
        y: -10,
        duration: 2 + (index % 3) * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2
      })
    })

    // Skill progress bars animation
    gsap.utils.toArray('.skill-progress').forEach((progress: any) => {
      const width = progress.style.width
      gsap.from(progress, {
        scrollTrigger: {
          trigger: progress,
          start: 'top bottom-=100',
        },
        width: 0,
        duration: 1.5,
        ease: 'power2.out'
      })
    })

    // Projects animation with floating
    gsap.utils.toArray('.project-card').forEach((card: any, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top bottom-=50',
          toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out'
      })

      // Add subtle floating to project cards
      gsap.to(card, {
        y: -8,
        duration: 2.5 + (index % 2) * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5 + index * 0.1
      })
    })

    // About section animation
    gsap.from('.about-image', {
      scrollTrigger: {
        trigger: '.about-image',
        start: 'top bottom-=100',
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    })

    // Floating effect for about image
    gsap.to('.about-image', {
      y: -12,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    })

    gsap.from('.about-text', {
      scrollTrigger: {
        trigger: '.about-text',
        start: 'top bottom-=100',
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    })

    // Section headings animation with floating
    gsap.utils.toArray('section h2').forEach((heading: any) => {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: 'top bottom-=50',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      })

      // Subtle floating for headings
      gsap.to(heading, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    })

    // Navbar slide in
    gsap.from('header', {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.3
    })

    // Add floating effect to buttons on hover
    gsap.utils.toArray('button, .btn, a[href]').forEach((btn: any) => {
      gsap.to(btn, {
        y: -3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        paused: true
      })
    })

    // Floating badges
    gsap.utils.toArray('.badge, [class*="badge"]').forEach((badge: any, index) => {
      gsap.to(badge, {
        y: -4,
        duration: 1.8 + (index % 3) * 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.1
      })
    })

    // Floating cards in general
    gsap.utils.toArray('[class*="Card"], .card').forEach((card: any, index) => {
      gsap.to(card, {
        y: -6,
        duration: 2.2 + (index % 4) * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.15
      })
    })

    // Resume section cards floating
    gsap.utils.toArray('#resume .card, #resume [class*="Card"]').forEach((card: any, index) => {
      gsap.to(card, {
        y: -8,
        duration: 2.4 + (index % 3) * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2
      })
    })

    // Contact section floating
    gsap.to('#contact .card, #contact [class*="Card"]', {
      y: -10,
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.3
    })

    // Footer elements floating
    gsap.utils.toArray('footer a, footer .icon, footer svg').forEach((elem: any, index) => {
      gsap.to(elem, {
        y: -4,
        duration: 2 + (index % 5) * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.08
      })
    })

    // Footer sections floating
    gsap.utils.toArray('footer > div > div, footer .grid > div').forEach((section: any, index) => {
      gsap.to(section, {
        y: -6,
        duration: 2.8 + (index % 2) * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.15
      })
    })

    // Achievement/certification cards floating
    gsap.utils.toArray('#resume .grid > div').forEach((achievement: any, index) => {
      gsap.to(achievement, {
        y: -7,
        duration: 2.3 + (index % 4) * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.12
      })
    })

    // Social media icons floating
    gsap.utils.toArray('.social-icon, a[href*="github"], a[href*="linkedin"], a[href*="twitter"], a[href*="mail"]').forEach((icon: any, index) => {
      gsap.to(icon, {
        y: -5,
        scale: 1.05,
        duration: 1.8 + (index % 3) * 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.1
      })
    })

    // Images floating effect
    gsap.utils.toArray('img').forEach((img: any, index) => {
      gsap.to(img, {
        y: -8,
        duration: 2.5 + (index % 3) * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.1
      })
    })

    // Input fields subtle floating
    gsap.utils.toArray('input, textarea, select').forEach((input: any, index) => {
      gsap.to(input, {
        y: -3,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.05
      })
    })

    // Separator lines floating
    gsap.utils.toArray('.separator, hr').forEach((sep: any) => {
      gsap.to(sep, {
        y: -2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    })

  }, [gsap, ScrollTrigger, isLoading])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    playClickSound()
    setIsSending(true)

    try {
      // Make the request directly from the browser to avoid Cloudflare blocking
      const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '23f5d98e-1db6-41ca-83fe-476733296580'
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: apiKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Contact from ${formData.name}`,
          from_name: 'Portfolio Contact Form',
          replyto: formData.email
        })
      })

      const result = await response.json()

      if (result.success) {
        alert('✅ Message sent successfully! I will get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error(result.message || 'Failed to send')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Fallback to mailto
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )
      window.location.href = `mailto:ayushsao32@gmail.com?subject=${subject}&body=${body}`
      
      setTimeout(() => {
        alert('✅ Your email client has been opened. Please send the email from there.')
        setFormData({ name: '', email: '', message: '' })
      }, 500)
    } finally {
      setIsSending(false)
    }
  }

  // Preloader GSAP animations
  useEffect(() => {
    if (!gsap || !isLoading) return

    const tl = gsap.timeline()

    // Animate spinner
    tl.from('.preloader-spinner', {
      scale: 0,
      rotation: -180,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })

    // Animate name letters
    tl.from('.preloader-letter', {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.3')

    // Animate subtitle
    tl.from('.preloader-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.2')

    // Animate progress bar container
    tl.from('.preloader-progress-container', {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.3')

    // Animate loading text
    tl.from('.preloader-loading-text', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.2')

    // Pulse animation for spinner
    gsap.to('.preloader-spinner-glow', {
      scale: 1.2,
      opacity: 0.5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    })

  }, [gsap, isLoading])

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
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Main preloader content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          {/* Enhanced loading spinner */}
          <div className="relative mb-12 preloader-spinner">
            {/* Outer spinning ring */}
            <div className="w-32 h-32 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>
            {/* Center glowing dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="preloader-spinner-glow w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
            </div>
            {/* Inner rotating ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-transparent border-b-cyan-400 border-l-cyan-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
          </div>

          {/* Animated name display */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white flex flex-wrap justify-center gap-1">
              {"AYUSH KUMAR SAO".split('').map((letter, index) => (
                <span
                  key={index}
                  className="preloader-letter inline-block"
                  style={{
                    animation: `wave 2s ease-in-out infinite`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </h1>
            <p className="preloader-subtitle text-xl text-purple-300 animate-pulse">Aspiring Software Engineer in C++ and JavaScript (React.js, Next.js)</p>
          </div>

          {/* Enhanced progress indicator */}
          <div className="preloader-progress-container w-80 max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-cyan-400 font-semibold flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-ping"></span>
                Loading Portfolio...
              </span>
              <span className="text-pink-400 font-semibold animate-pulse">Please wait...</span>
            </div>
            <div className="w-full h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm relative">
              <div className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-purple-500/30"
                   style={{
                     animation: 'progressBar 4s ease-in-out'
                   }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
            <div className="mt-3 flex justify-between text-xs text-white/50">
              <span>Initializing...</span>
              <span className="animate-pulse">Loading assets...</span>
            </div>
          </div>

          {/* Loading text with dots */}
          <div className="preloader-loading-text mt-8">
            <p className="text-white/70 flex items-center gap-1">
              <span>Preparing your experience</span>
              <span className="inline-flex gap-1">
                <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
              </span>
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes wave {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes progressBar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-20px) translateX(10px); }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 relative overflow-hidden">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="hidden md:block fixed w-8 h-8 border-2 border-purple-500 dark:border-purple-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: '-16px',
          top: '-16px',
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          transition: 'transform 0.2s ease-out',
          opacity: mounted ? 1 : 0
        }}
      />
      <div 
        ref={cursorDotRef}
        className="hidden md:block fixed w-1 h-1 bg-purple-500 dark:bg-purple-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: '-2px',
          top: '-2px',
          opacity: mounted ? 1 : 0
        }}
      />

      {/* Floating geometric objects throughout the page - Hidden on mobile for performance */}
      <div className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top section - Large objects with varied animations */}
        <div className="absolute top-5 left-5 w-32 h-32 bg-purple-300/20 dark:bg-purple-500/20 rounded-full animate-float-spiral parallax-slow"></div>
        <div className="absolute top-10 right-10 w-28 h-28 bg-blue-300/20 dark:bg-blue-500/20 rounded-full animate-float-wave parallax-medium"></div>
        <div className="absolute top-20 left-1/4 w-24 h-24 bg-emerald-300/20 dark:bg-emerald-500/20 rounded-full animate-float-bounce parallax-fast"></div>
        <div className="absolute top-32 right-1/4 w-20 h-20 bg-pink-300/20 dark:bg-pink-500/20 transform rotate-45 animate-float-zigzag parallax-slow"></div>
        <div className="absolute top-16 left-1/3 w-26 h-26 bg-indigo-300/20 dark:bg-indigo-500/20 rounded-full animate-float-slow parallax-medium"></div>
        <div className="absolute top-40 right-1/3 w-22 h-22 bg-cyan-300/20 dark:bg-cyan-500/20 transform rotate-45 animate-float-medium parallax-fast"></div>
        
        {/* Upper-left quadrant */}
        <div className="absolute top-1/6 left-8 w-20 h-20 bg-yellow-300/20 dark:bg-yellow-500/20 rounded-full animate-float-wave parallax-medium"></div>
        <div className="absolute top-1/5 left-24 w-18 h-18 bg-rose-300/20 dark:bg-rose-500/20 transform rotate-45 animate-float-spiral parallax-slow"></div>
        <div className="absolute top-1/4 left-12 w-16 h-16 bg-violet-300/20 dark:bg-violet-500/20 rounded-full animate-float-bounce parallax-fast"></div>
        <div className="absolute top-48 left-32 w-14 h-14 bg-teal-300/20 dark:bg-teal-500/20 transform rotate-45 animate-float-zigzag parallax-medium"></div>
        
        {/* Upper-right quadrant */}
        <div className="absolute top-1/6 right-8 w-24 h-24 bg-orange-300/20 dark:bg-orange-500/20 rounded-full animate-float-fast parallax-slow"></div>
        <div className="absolute top-1/5 right-24 w-20 h-20 bg-purple-300/20 dark:bg-purple-500/20 transform rotate-45 animate-pulse-glow parallax-medium"></div>
        <div className="absolute top-1/4 right-16 w-18 h-18 bg-blue-300/20 dark:bg-blue-500/20 rounded-full animate-float-wave parallax-fast"></div>
        <div className="absolute top-56 right-32 w-16 h-16 bg-emerald-300/20 dark:bg-emerald-500/20 transform rotate-45 animate-float-spiral parallax-slow"></div>
        
        {/* Middle-left section */}
        <div className="absolute top-1/3 left-6 w-28 h-28 bg-pink-300/20 dark:bg-pink-500/20 rounded-full animate-float-spiral parallax-medium"></div>
        <div className="absolute top-2/5 left-16 w-22 h-22 bg-indigo-300/20 dark:bg-indigo-500/20 transform rotate-45 animate-float-bounce parallax-fast"></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-cyan-300/20 dark:bg-cyan-500/20 rounded-full animate-float-zigzag parallax-slow"></div>
        <div className="absolute top-3/5 left-20 w-18 h-18 bg-yellow-300/20 dark:bg-yellow-500/20 transform rotate-45 animate-float-wave parallax-medium"></div>
        <div className="absolute top-7/12 left-8 w-16 h-16 bg-rose-300/20 dark:bg-rose-500/20 rounded-full animate-pulse-glow parallax-fast"></div>
        
        {/* Middle-right section */}
        <div className="absolute top-1/3 right-6 w-26 h-26 bg-violet-300/20 dark:bg-violet-500/20 rounded-full animate-float-fast parallax-slow"></div>
        <div className="absolute top-2/5 right-16 w-24 h-24 bg-teal-300/20 dark:bg-teal-500/20 transform rotate-45 animate-float-spiral parallax-medium"></div>
        <div className="absolute top-1/2 right-12 w-20 h-20 bg-orange-300/20 dark:bg-orange-500/20 rounded-full animate-float-bounce parallax-fast"></div>
        <div className="absolute top-3/5 right-24 w-18 h-18 bg-purple-300/20 dark:bg-purple-500/20 transform rotate-45 animate-float-wave parallax-slow"></div>
        <div className="absolute top-7/12 right-8 w-16 h-16 bg-blue-300/20 dark:bg-blue-500/20 rounded-full animate-float-zigzag parallax-medium"></div>
        
        {/* Center area */}
        <div className="absolute top-1/2 left-1/2 w-14 h-14 bg-emerald-300/20 dark:bg-emerald-500/20 rounded-full animate-pulse-glow parallax-fast"></div>
        <div className="absolute top-2/3 left-1/3 w-18 h-18 bg-pink-300/20 dark:bg-pink-500/20 transform rotate-45 animate-float-spiral parallax-slow"></div>
        <div className="absolute top-1/2 left-2/5 w-16 h-16 bg-indigo-300/20 dark:bg-indigo-500/20 rounded-full animate-float-wave parallax-medium"></div>
        <div className="absolute top-3/5 left-3/5 w-20 h-20 bg-cyan-300/20 dark:bg-cyan-500/20 transform rotate-45 animate-float-bounce parallax-fast"></div>
        <div className="absolute top-5/12 right-2/5 w-12 h-12 bg-yellow-300/20 dark:bg-yellow-500/20 rounded-full animate-float-zigzag parallax-slow"></div>
        
        {/* Lower-left quadrant */}
        <div className="absolute bottom-1/4 left-10 w-28 h-28 bg-rose-300/20 dark:bg-rose-500/20 rounded-full animate-float-wave parallax-medium"></div>
        <div className="absolute bottom-1/3 left-24 w-24 h-24 bg-violet-300/20 dark:bg-violet-500/20 transform rotate-45 animate-float-spiral parallax-fast"></div>
        <div className="absolute bottom-2/5 left-16 w-20 h-20 bg-teal-300/20 dark:bg-teal-500/20 rounded-full animate-float-bounce parallax-slow"></div>
        <div className="absolute bottom-1/5 left-32 w-18 h-18 bg-orange-300/20 dark:bg-orange-500/20 transform rotate-45 animate-float-zigzag parallax-medium"></div>
        <div className="absolute bottom-1/6 left-8 w-16 h-16 bg-purple-300/20 dark:bg-purple-500/20 rounded-full animate-pulse-glow parallax-fast"></div>
        
        {/* Lower-right quadrant */}
        <div className="absolute bottom-1/4 right-12 w-26 h-26 bg-blue-300/20 dark:bg-blue-500/20 rounded-full animate-float-spiral parallax-slow"></div>
        <div className="absolute bottom-1/3 right-28 w-22 h-22 bg-emerald-300/20 dark:bg-emerald-500/20 transform rotate-45 animate-float-wave parallax-medium"></div>
        <div className="absolute bottom-2/5 right-16 w-20 h-20 bg-pink-300/20 dark:bg-pink-500/20 rounded-full animate-float-bounce parallax-fast"></div>
        <div className="absolute bottom-1/5 right-32 w-18 h-18 bg-indigo-300/20 dark:bg-indigo-500/20 transform rotate-45 animate-pulse-glow parallax-slow"></div>
        <div className="absolute bottom-1/6 right-10 w-16 h-16 bg-cyan-300/20 dark:bg-cyan-500/20 rounded-full animate-float-zigzag parallax-medium"></div>
        
        {/* Bottom section */}
        <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-yellow-300/20 dark:bg-yellow-500/20 rounded-full animate-float-wave parallax-fast"></div>
        <div className="absolute bottom-16 right-1/4 w-20 h-20 bg-rose-300/20 dark:bg-rose-500/20 transform rotate-45 animate-float-spiral parallax-slow"></div>
        <div className="absolute bottom-8 left-1/3 w-18 h-18 bg-violet-300/20 dark:bg-violet-500/20 rounded-full animate-float-bounce parallax-medium"></div>
        <div className="absolute bottom-12 right-1/3 w-22 h-22 bg-teal-300/20 dark:bg-teal-500/20 transform rotate-45 animate-float-zigzag parallax-fast"></div>
        <div className="absolute bottom-20 left-2/5 w-16 h-16 bg-orange-300/20 dark:bg-orange-500/20 rounded-full animate-pulse-glow parallax-slow"></div>
        <div className="absolute bottom-24 right-2/5 w-14 h-14 bg-purple-300/20 dark:bg-purple-500/20 transform rotate-45 animate-float-wave parallax-medium"></div>
        
        {/* Scattered throughout - Mix of sizes */}
        <div className="absolute top-2/3 left-1/5 w-14 h-14 bg-blue-300/20 dark:bg-blue-500/20 rounded-full animate-float-spiral parallax-fast"></div>
        <div className="absolute top-3/4 left-1/6 w-16 h-16 bg-emerald-300/20 dark:bg-emerald-500/20 transform rotate-45 animate-float-wave parallax-slow"></div>
        <div className="absolute top-1/5 right-1/5 w-18 h-18 bg-pink-300/20 dark:bg-pink-500/20 rounded-full animate-float-bounce parallax-medium"></div>
        <div className="absolute top-1/8 right-1/6 w-12 h-12 bg-indigo-300/20 dark:bg-indigo-500/20 transform rotate-45 animate-float-zigzag parallax-fast"></div>
        <div className="absolute top-3/5 left-2/3 w-20 h-20 bg-cyan-300/20 dark:bg-cyan-500/20 rounded-full animate-pulse-glow parallax-slow"></div>
        <div className="absolute top-4/5 right-1/4 w-22 h-22 bg-yellow-300/20 dark:bg-yellow-500/20 transform rotate-45 animate-float-spiral parallax-medium"></div>
        <div className="absolute top-5/6 left-3/4 w-16 h-16 bg-rose-300/20 dark:bg-rose-500/20 rounded-full animate-float-wave parallax-fast"></div>
        <div className="absolute bottom-3/5 left-1/8 w-18 h-18 bg-violet-300/20 dark:bg-violet-500/20 transform rotate-45 animate-float-bounce parallax-slow"></div>
        <div className="absolute bottom-4/5 right-1/8 w-14 h-14 bg-teal-300/20 dark:bg-teal-500/20 rounded-full animate-float-zigzag parallax-medium"></div>
        
        {/* Triangles scattered */}
        <div className="absolute top-64 left-1/4 w-0 h-0 border-l-10 border-r-10 border-b-20 border-l-transparent border-r-transparent border-b-purple-300/30 dark:border-b-purple-500/30 animate-float-spiral parallax-fast"></div>
        <div className="absolute top-80 right-1/4 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-blue-300/30 dark:border-b-blue-500/30 animate-float-bounce parallax-slow"></div>
        <div className="absolute top-96 left-1/3 w-0 h-0 border-l-12 border-r-12 border-b-24 border-l-transparent border-r-transparent border-b-emerald-300/30 dark:border-b-emerald-500/30 animate-float-wave parallax-medium"></div>
        <div className="absolute bottom-64 right-1/3 w-0 h-0 border-l-10 border-r-10 border-b-20 border-l-transparent border-r-transparent border-b-pink-300/30 dark:border-b-pink-500/30 animate-float-zigzag parallax-fast"></div>
        <div className="absolute bottom-80 left-2/5 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-indigo-300/30 dark:border-b-indigo-500/30 animate-pulse-glow parallax-slow"></div>
        <div className="absolute top-1/3 left-1/5 w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-cyan-300/30 dark:border-b-cyan-500/30 animate-float-spiral parallax-medium"></div>
        <div className="absolute top-2/3 right-1/5 w-0 h-0 border-l-10 border-r-10 border-b-20 border-l-transparent border-r-transparent border-b-yellow-300/30 dark:border-b-yellow-500/30 animate-float-wave parallax-fast"></div>
        <div className="absolute bottom-1/3 left-1/2 w-0 h-0 border-l-12 border-r-12 border-b-24 border-l-transparent border-r-transparent border-b-rose-300/30 dark:border-b-rose-500/30 animate-float-bounce parallax-slow"></div>
        
        {/* Small accent dots - Extra layer */}
        <div className="absolute top-1/12 left-1/12 w-4 h-4 bg-purple-400/40 dark:bg-purple-500/40 rounded-full animate-pulse-glow parallax-medium"></div>
        <div className="absolute top-2/12 left-2/12 w-3 h-3 bg-blue-400/40 dark:bg-blue-500/40 rounded-full animate-float-spiral parallax-fast"></div>
        <div className="absolute top-1/6 left-1/6 w-5 h-5 bg-emerald-400/40 dark:bg-emerald-500/40 rounded-full animate-float-wave parallax-slow"></div>
        <div className="absolute top-1/4 left-1/8 w-4 h-4 bg-pink-400/40 dark:bg-pink-500/40 rounded-full animate-float-bounce parallax-medium"></div>
        <div className="absolute top-1/3 left-1/12 w-3 h-3 bg-indigo-400/40 dark:bg-indigo-500/40 rounded-full animate-float-zigzag parallax-fast"></div>
        <div className="absolute bottom-1/6 left-1/4 w-5 h-5 bg-cyan-400/40 dark:bg-cyan-500/40 rounded-full animate-pulse-glow parallax-slow"></div>
        <div className="absolute bottom-1/12 left-1/6 w-4 h-4 bg-yellow-400/40 dark:bg-yellow-500/40 rounded-full animate-float-spiral parallax-medium"></div>
        <div className="absolute bottom-2/12 left-1/8 w-3 h-3 bg-rose-400/40 dark:bg-rose-500/40 rounded-full animate-float-wave parallax-fast"></div>
        <div className="absolute top-3/4 right-1/3 w-5 h-5 bg-violet-400/40 dark:bg-violet-500/40 rounded-full animate-float-bounce parallax-slow"></div>
        <div className="absolute top-5/6 right-1/4 w-4 h-4 bg-teal-400/40 dark:bg-teal-500/40 rounded-full animate-float-zigzag parallax-medium"></div>
        <div className="absolute top-1/8 right-1/6 w-3 h-3 bg-orange-400/40 dark:bg-orange-500/40 rounded-full animate-pulse-glow parallax-fast"></div>
        <div className="absolute top-1/12 right-1/12 w-5 h-5 bg-purple-400/40 dark:bg-purple-500/40 rounded-full animate-float-spiral parallax-slow"></div>
        <div className="absolute bottom-1/8 right-2/3 w-4 h-4 bg-blue-400/40 dark:blue-500/40 rounded-full animate-float-wave parallax-medium"></div>
        <div className="absolute bottom-1/6 right-1/5 w-3 h-3 bg-emerald-400/40 dark:bg-emerald-500/40 rounded-full animate-float-bounce parallax-fast"></div>
        <div className="absolute bottom-1/4 right-1/6 w-5 h-5 bg-pink-400/40 dark:bg-pink-500/40 rounded-full animate-float-zigzag parallax-slow"></div>
        
        {/* Horizontal lines */}
        <div className="absolute top-1/5 left-1/6 w-24 h-2 bg-gradient-to-r from-purple-300/30 to-transparent dark:from-purple-500/30 rounded-full animate-float-wave parallax-medium"></div>
        <div className="absolute top-2/5 right-1/6 w-28 h-2 bg-gradient-to-l from-blue-300/30 to-transparent dark:from-blue-500/30 rounded-full animate-float-spiral parallax-fast"></div>
        <div className="absolute bottom-1/4 left-1/5 w-20 h-1 bg-gradient-to-r from-emerald-300/30 to-transparent dark:from-emerald-500/30 rounded-full animate-float-bounce parallax-slow"></div>
        <div className="absolute bottom-2/5 right-1/5 w-26 h-1 bg-gradient-to-l from-pink-300/30 to-transparent dark:from-pink-500/30 rounded-full animate-float-zigzag parallax-medium"></div>
      </div>

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
                onClick={() => {
                  playClickSound()
                  setIsMenuOpen(!isMenuOpen)
                }}
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
                <a href="#about" className="hover:text-purple-600 transition-colors" onClick={playClickSound}>
                  About
                </a>
                <a href="#skills" className="hover:text-purple-600 transition-colors" onClick={playClickSound}>
                  Skills
                </a>
                <a href="#resume" className="hover:text-purple-600 transition-colors" onClick={playClickSound}>
                  Resume
                </a>
                <a href="#projects" className="hover:text-purple-600 transition-colors" onClick={playClickSound}>
                  Projects
                </a>
                <a href="#contact" className="hover:text-purple-600 transition-colors" onClick={playClickSound}>
                  Contact
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="hero-content max-w-4xl mx-auto">
            <div className="hero-avatar w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl">
              <img
                src="/placeholder-user.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              {fullName}
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-8 font-medium">
              Software Developer | C++ • JavaScript • React
            </p>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Building scalable web applications and solving complex problems. Top 0.4% on LeetCode with a 500-day streak. Currently seeking opportunities in product engineering.
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
                  playClickSound()
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
                  alt="About"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="about-text">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                About
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                CS student at Technocrats Institute of Technology, Bhopal. I build web apps with React, Next.js, and Tailwind, and I'm pretty good with C++ and algorithms.
              </p>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Top 0.4% on LeetCode (500-day streak, 1000+ problems solved). Did a frontend internship at Vault Of Code where I worked on UI implementation and code optimization.
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
                      B.Tech in Computer Science
                    </h4>
                    <Badge variant="secondary">Oct 2022 - June 2026</Badge>
                  </div>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                    Technocrats Institute Of Technology, Bhopal
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Currently pursuing B.Tech in Computer Science Engineering with focus on Object-Oriented Programming, DBMS, Operating Systems, and Computer Networks.
                  </p>
                  <div className="mt-3">
                    <Badge variant="outline">CGPA: 7.54</Badge>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-slate-800 dark:text-white">
                      Class XII - CBSE
                    </h4>
                    <Badge variant="secondary">April 2021</Badge>
                  </div>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                    DAV Public School, Chaibasa
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Completed higher secondary education with focus on Science stream.
                  </p>
                  <div className="mt-3">
                    <Badge variant="outline">Percentage: 84%</Badge>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold text-slate-800 dark:text-white">
                      Class X - CBSE
                    </h4>
                    <Badge variant="secondary">March 2019</Badge>
                  </div>
                  <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                    DAV Public School, Chaibasa
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Completed secondary education with strong academic performance.
                  </p>
                  <div className="mt-3">
                    <Badge variant="outline">Percentage: 87.2%</Badge>
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
                      Frontend Developer Intern
                    </h4>
                    <Badge variant="secondary">June 2025 - Aug 2025</Badge>
                  </div>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                    Vault Of Code, Remote
                  </p>
                  <ul className="text-slate-600 dark:text-slate-400 mb-3 space-y-2 list-disc list-inside">
                    <li>Translated UI/UX designs into clean, responsive, and efficient code using HTML, CSS, JavaScript, and React</li>
                    <li>Collaborated closely with design and backend teams to ensure smooth integration and consistent user experience</li>
                    <li>Participated in code reviews and optimized frontend performance for faster load times and better usability</li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <Badge>HTML</Badge>
                    <Badge>CSS</Badge>
                    <Badge>JavaScript</Badge>
                    <Badge>React</Badge>
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
                    LeetCode, CodeChef & GeeksforGeeks
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">
                    Ranked 340th globally in LeetCode Weekly Contest (50,000+ participants). Maintained a 500-day LeetCode streak, solving 1000+ problems. Global Rank 565 on CodeChef, 2-Star Coder (Max Rating 1490).
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Data Structures</Badge>
                    <Badge>Algorithms</Badge>
                    <Badge>C++</Badge>
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
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                  LeetCode Top 0.4% Globally
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Ranked 340th globally in LeetCode Weekly Contest with 50,000+ participants
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                  500-Day LeetCode Streak
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Maintained a 500-day LeetCode streak, solving 1000+ problems
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                  CodeChef 2-Star Coder
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Global Rank 565 on CodeChef with Max Rating 1490
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                  AWS Cloud Practitioner Certified
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Basics of AWS services and security
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                  GitHub Foundations
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Core Git and GitHub workflows certified
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                  DevFest Bhopal 2024
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Attended by GDG; explored Web, Cloud, and Mobile technologies
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
                playClickSound()
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
              <Card key={index} className="project-card group hover:shadow-xl transition-all duration-300 overflow-hidden">
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
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white">
              Get in Touch
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              Feel free to reach out for opportunities or just to chat
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <textarea
                          name="message"
                          placeholder="Your Message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isSending}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        {isSending ? 'Sending...' : 'Send Email'}
                      </Button>
                    </form>
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
                Aspiring software engineer skilled in C++ and JavaScript (React.js, Next.js), ranked in the Top 0.4% on LeetCode. B.Tech Computer Science student passionate about building robust web applications and solving complex algorithmic problems.
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
