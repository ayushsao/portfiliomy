"use client"

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({ children, speed = 0.5, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 })
  
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

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}

export function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  className = "" 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    }
  }
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StickyScrollProps {
  children: React.ReactNode
  className?: string
}

export function StickyScroll({ children, className = "" }: StickyScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(element, {
            scale: 1 + progress * 0.1,
            rotation: progress * 5,
            duration: 0.3
          })
        }
      }
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 origin-left"
      style={{ scaleX }}
    />
  )
}

interface MorphingSectionProps {
  children: React.ReactNode
  className?: string
}

export function MorphingSection({ children, className = "" }: MorphingSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0px", "50px", "0px"]
  )
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1.1, 0.8]
  )
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  )
  
  return (
    <motion.div
      ref={ref}
      style={{
        borderRadius,
        scale,
        opacity
      }}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface TextRevealProps {
  text: string
  className?: string
}

export function TextReveal({ text, className = "" }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  
  const words = text.split(' ')
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }
  
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
          style={{ marginRight: "5px" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

interface ScrollTriggeredAnimationProps {
  children: React.ReactNode
  animation?: 'fade' | 'slide' | 'scale' | 'rotate' | 'flip'
  className?: string
}

export function ScrollTriggeredAnimation({ 
  children, 
  animation = 'fade',
  className = "" 
}: ScrollTriggeredAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const animations = {
      fade: {
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      },
      slide: {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      },
      scale: {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
      },
      rotate: {
        rotation: 180,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      },
      flip: {
        rotationY: 90,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }
    }
    
    gsap.fromTo(element, animations[animation], {
      ...Object.keys(animations[animation]).reduce((acc, key) => {
        if (key !== 'duration' && key !== 'ease') {
          acc[key] = key === 'opacity' ? 1 : 0
        }
        return acc
      }, {} as any),
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [animation])
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
