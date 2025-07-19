"use client"

import { useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Enhanced Parallax with smooth motion
interface EnhancedParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: 'up' | 'down'
}

export function EnhancedParallax({ 
  children, 
  speed = 0.5, 
  className = "",
  direction = 'up'
}: EnhancedParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const multiplier = direction === 'up' ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100 * multiplier])
  const ySpring = useSpring(y, { stiffness: 400, damping: 40 })
  
  return (
    <motion.div
      ref={ref}
      style={{ y: ySpring }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Smooth reveal with stagger
interface SmoothRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  stagger?: number
  className?: string
}

export function SmoothReveal({ 
  children, 
  direction = 'up', 
  delay = 0,
  stagger = 0.1,
  className = "" 
}: SmoothRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-20px",
    amount: 0.1
  })
  
  const variants = useMemo(() => ({
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
      y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    }
  }), [direction])
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ 
        duration: 0.8, 
        delay: delay + stagger,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Floating animation with smooth motion
interface FloatingElementProps {
  children: React.ReactNode
  intensity?: number
  speed?: number
  className?: string
}

export function FloatingElement({ 
  children, 
  intensity = 20, 
  speed = 2,
  className = "" 
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-intensity/2, intensity/2, -intensity/2],
        x: [-intensity/4, intensity/4, -intensity/4],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: speed + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// Enhanced morphing section with smoother transforms
interface EnhancedMorphingSectionProps {
  children: React.ReactNode
  className?: string
}

export function EnhancedMorphingSection({ children, className = "" }: EnhancedMorphingSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["0px", "30px", "30px", "0px"]
  )
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1.05, 1.05, 0.95]
  )
  
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [2, 0, -2]
  )
  
  return (
    <motion.div
      ref={ref}
      style={{
        borderRadius,
        scale,
        rotateX,
        transformPerspective: 1200
      }}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Smooth text reveal with enhanced animations
interface EnhancedTextRevealProps {
  text: string
  className?: string
  stagger?: number
}

export function EnhancedTextReveal({ 
  text, 
  className = "",
  stagger = 0.05
}: EnhancedTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  const words = useMemo(() => text.split(' '), [text])
  
  const container = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: stagger, 
        delayChildren: 0.1,
        when: "beforeChildren"
      },
    },
  }), [stagger])
  
  const child = useMemo(() => ({
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 90,
    },
  }), [])
  
  return (
    <motion.div
      ref={ref}
      style={{ 
        overflow: "hidden", 
        display: "flex", 
        flexWrap: "wrap",
        perspective: 1000
      }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ 
            marginRight: "0.3em",
            transformOrigin: "bottom center"
          }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Enhanced scroll progress with smooth motion
export function EnhancedScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001
  })
  
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-500 z-50 origin-left"
        style={{ scaleX }}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-emerald-400/30 z-49 origin-left blur-sm"
        style={{ 
          scaleX,
          height: "4px",
          marginTop: "-1px"
        }}
      />
    </>
  )
}

// Magnetic hover effect for cards
interface MagneticCardProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function MagneticCard({ 
  children, 
  className = "",
  strength = 0.1
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    
    x.set(deltaX * strength)
    y.set(deltaY * strength)
    rotateX.set(-deltaY * strength * 0.1)
    rotateY.set(deltaX * strength * 0.1)
  }, [x, y, rotateX, rotateY, strength])
  
  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }, [x, y, rotateX, rotateY])
  
  return (
    <motion.div
      ref={ref}
      style={{ 
        x, 
        y, 
        rotateX, 
        rotateY,
        transformPerspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated counter with smooth counting
interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  className?: string
}

export function AnimatedCounter({ 
  from, 
  to, 
  duration = 2,
  className = "" 
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (!isInView) return
    
    const controls = { value: from }
    
    gsap.to(controls, {
      value: to,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(controls.value).toString()
        }
      }
    })
  }, [isInView, from, to, duration])
  
  return <span ref={ref} className={className}>{from}</span>
}

// Smooth stagger animation for children
interface StaggerContainerProps {
  children: React.ReactNode
  stagger?: number
  className?: string
}

export function StaggerContainer({ 
  children, 
  stagger = 0.1,
  className = "" 
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const staggerItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20
    }
  }
}
