"use client"

import { useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface OptimizedParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function OptimizedParallax({ children, speed = 0.5, className = "" }: OptimizedParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Use transform instead of spring for better performance
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 50}%`])
  
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface OptimizedScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}

export function OptimizedScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  className = "" 
}: OptimizedScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.3
  })
  
  const variants = useMemo(() => ({
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    }
  }), [direction])
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface OptimizedMorphingSectionProps {
  children: React.ReactNode
  className?: string
}

export function OptimizedMorphingSection({ children, className = "" }: OptimizedMorphingSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Reduced calculations for better performance
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0px", "20px", "0px"]
  )
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1.02, 0.95]
  )
  
  return (
    <motion.div
      ref={ref}
      style={{
        borderRadius,
        scale
      }}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function OptimizedScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

interface OptimizedTextRevealProps {
  text: string
  className?: string
}

export function OptimizedTextReveal({ text, className = "" }: OptimizedTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  
  const words = useMemo(() => text.split(' '), [text])
  
  const container = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }), [])
  
  const child = useMemo(() => ({
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  }), [])
  
  return (
    <motion.div
      ref={ref}
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.3em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

interface OptimizedScrollTriggerProps {
  children: React.ReactNode
  animation?: 'fade' | 'slide' | 'scale'
  className?: string
}

export function OptimizedScrollTrigger({ 
  children, 
  animation = 'fade',
  className = "" 
}: OptimizedScrollTriggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const ctx = gsap.context(() => {
      const animations = {
        fade: {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        },
        slide: {
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        },
        scale: {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      }
      
      gsap.fromTo(element, animations[animation], {
        ...Object.keys(animations[animation]).reduce((acc, key) => {
          if (key !== 'duration' && key !== 'ease') {
            acc[key] = key === 'opacity' ? 1 : key === 'scale' ? 1 : 0
          }
          return acc
        }, {} as any),
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        }
      })
    }, element)
    
    return () => ctx.revert()
  }, [animation])
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Optimized smooth scroll hook
export function useOptimizedSmoothScroll() {
  useEffect(() => {
    const lenis = new (require('@studio-freight/lenis'))({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
}
