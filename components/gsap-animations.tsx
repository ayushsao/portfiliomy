"use client"

import { useEffect, useRef } from 'react'
import { useGSAP } from '@/hooks/use-gsap'

export function GSAPButton({ 
  children, 
  className = "", 
  onClick,
  variant = "primary"
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { gsap } = useGSAP()

  useEffect(() => {
    if (!gsap || !buttonRef.current) return

    const button = buttonRef.current
    const tl = gsap.timeline({ paused: true })

    // Create floating particles effect
    const particles: HTMLDivElement[] = []
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute w-1 h-1 bg-white rounded-full pointer-events-none'
      particle.style.opacity = '0'
      button.appendChild(particle)
      particles.push(particle)
    }

    tl.to(button, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out"
    })
    .to(particles, {
      opacity: 1,
      scale: 1.5,
      x: () => gsap.utils.random(-20, 20),
      y: () => gsap.utils.random(-20, 20),
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.out"
    }, 0.1)
    .to(particles, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      ease: "power2.in"
    }, 0.3)

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        boxShadow: "0 4px 15px rgba(139, 92, 246, 0.2)",
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleClick = () => {
      tl.restart()
      onClick?.()
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
    button.addEventListener('click', handleClick)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      button.removeEventListener('click', handleClick)
      particles.forEach(particle => particle.remove())
    }
  }, [gsap, onClick])

  const baseClasses = "relative overflow-hidden px-6 py-3 rounded-lg font-semibold transition-all duration-300"
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg",
    secondary: "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg",
    ghost: "border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
  }

  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export function AnimatedText({ 
  text, 
  className = "",
  delay = 0
}: {
  text: string
  className?: string
  delay?: number
}) {
  const textRef = useRef<HTMLDivElement>(null)
  const { gsap } = useGSAP()

  useEffect(() => {
    if (!gsap || !textRef.current) return

    const element = textRef.current
    const letters = text.split('').map(letter => {
      const span = document.createElement('span')
      span.textContent = letter === ' ' ? '\u00A0' : letter
      span.style.display = 'inline-block'
      return span
    })

    element.innerHTML = ''
    letters.forEach(letter => element.appendChild(letter))

    gsap.from(letters, {
      opacity: 0,
      y: 30,
      rotationX: 90,
      transformOrigin: "50% 50%",
      duration: 0.8,
      stagger: 0.05,
      delay: delay,
      ease: "back.out(1.7)"
    })

    // Hover effect
    const handleMouseEnter = () => {
      gsap.to(letters, {
        color: "#8B5CF6",
        scale: 1.1,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(letters, {
        color: "",
        scale: 1,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out"
      })
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [gsap, text, delay])

  return <div ref={textRef} className={`cursor-pointer ${className}`} />
}

export function FloatingIcons() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { gsap } = useGSAP()

  useEffect(() => {
    if (!gsap || !containerRef.current) return

    const container = containerRef.current
    const icons = container.querySelectorAll('.floating-icon')

    icons.forEach((icon, index) => {
      gsap.to(icon, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-15, 15)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.2
      })
    })
  }, [gsap])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <div className="floating-icon absolute top-20 left-10 text-purple-600 opacity-20">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z"/>
        </svg>
      </div>
      <div className="floating-icon absolute top-32 right-20 text-blue-600 opacity-20">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.5 16L5 12L6.5 10.5L9.5 13.5L17.5 5.5L19 7L9.5 16Z"/>
        </svg>
      </div>
      <div className="floating-icon absolute bottom-32 left-20 text-emerald-600 opacity-20">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"/>
        </svg>
      </div>
      <div className="floating-icon absolute top-40 right-10 text-pink-600 opacity-20">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"/>
        </svg>
      </div>
    </div>
  )
}
