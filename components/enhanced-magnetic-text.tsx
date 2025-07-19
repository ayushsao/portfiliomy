"use client"

import { useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface EnhancedMagneticTextProps {
  children?: string
  text?: string
  className?: string
  strength?: number
}

export function EnhancedMagneticText({ 
  children, 
  text,
  className = "", 
  strength = 40 
}: EnhancedMagneticTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Use text prop or children, with fallback
  const displayText = text || children || ""
  
  const springConfig = useMemo(() => ({ 
    damping: 25, 
    stiffness: 300,
    restDelta: 0.001
  }), [])
  
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  
  // Add rotation based on movement
  const rotateX = useTransform(ySpring, [-50, 50], [5, -5])
  const rotateY = useTransform(xSpring, [-50, 50], [-5, 5])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const element = ref.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    )
    
    if (distance < 120) {
      const force = (120 - distance) / 120
      x.set((e.clientX - centerX) * force * (strength / 100))
      y.set((e.clientY - centerY) * force * (strength / 100))
    } else {
      x.set(0)
      y.set(0)
    }
  }, [x, y, strength])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      element.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <motion.div
      ref={ref}
      style={{ 
        x: xSpring, 
        y: ySpring,
        rotateX,
        rotateY,
        transformPerspective: 1000
      }}
      className={`inline-block cursor-pointer ${className}`}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      {displayText.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          whileHover={{ 
            scale: 1.2,
            y: -5,
            color: "#a855f7",
            textShadow: "0 0 20px rgba(168, 85, 247, 0.6)"
          }}
          transition={{ 
            duration: 0.2,
            delay: index * 0.02
          }}
          style={{
            display: 'inline-block',
            transformOrigin: 'center bottom'
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}

interface EnhancedFloatingLettersProps {
  text: string
  className?: string
}

export function EnhancedFloatingLetters({ text, className = "" }: EnhancedFloatingLettersProps) {
  const letters = useMemo(() => text.split(''), [text])
  
  return (
    <div className={`inline-flex ${className}`}>
      {letters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, Math.random() * 4 - 2, 0]
          }}
          transition={{
            duration: 2.5 + Math.random() * 1,
            repeat: Infinity,
            delay: index * 0.08,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.3,
            y: -12,
            color: "#a855f7",
            textShadow: "0 0 15px rgba(168, 85, 247, 0.8)",
            transition: { duration: 0.2 }
          }}
          style={{
            transformOrigin: 'center bottom'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}

interface EnhancedWaveTextProps {
  text: string
  className?: string
}

export function EnhancedWaveText({ text, className = "" }: EnhancedWaveTextProps) {
  const letters = useMemo(() => text.split(''), [text])
  
  return (
    <div className={`inline-flex ${className}`}>
      {letters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.4,
            color: "#3b82f6",
            textShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
            transition: { duration: 0.2 }
          }}
          style={{
            transformOrigin: 'center bottom'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}

interface EnhancedGlitchTextProps {
  text: string
  className?: string
}

export function EnhancedGlitchText({ text, className = "" }: EnhancedGlitchTextProps) {
  return (
    <motion.div 
      className={`relative inline-block ${className}`}
      whileHover="hover"
    >
      <motion.span
        variants={{
          hover: {
            textShadow: [
              "2px 0 0 #ff0000, -2px 0 0 #00ffff",
              "-2px 0 0 #ff0000, 2px 0 0 #00ffff",
              "2px 0 0 #ff0000, -2px 0 0 #00ffff"
            ],
            x: [0, 2, -2, 1, -1, 0],
            scale: [1, 1.02, 0.98, 1.01, 0.99, 1]
          }
        }}
        transition={{
          duration: 0.4,
          repeat: 2,
          ease: "easeInOut"
        }}
      >
        {text}
      </motion.span>
      
      {/* Glitch overlay effect */}
      <motion.span
        className="absolute inset-0 text-red-500 opacity-0"
        variants={{
          hover: {
            opacity: [0, 0.7, 0, 0.5, 0],
            x: [0, -3, 2, -1, 0],
          }
        }}
        transition={{
          duration: 0.4,
          repeat: 2,
          ease: "easeInOut"
        }}
      >
        {text}
      </motion.span>
      
      <motion.span
        className="absolute inset-0 text-cyan-500 opacity-0"
        variants={{
          hover: {
            opacity: [0, 0.5, 0, 0.8, 0],
            x: [0, 3, -2, 1, 0],
          }
        }}
        transition={{
          duration: 0.4,
          repeat: 2,
          ease: "easeInOut",
          delay: 0.1
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  )
}

// Typewriter effect with smooth animation
interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
}

export function TypewriterText({ 
  text, 
  speed = 100,
  delay = 0,
  className = "" 
}: TypewriterTextProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: speed / 1000,
            delayChildren: delay / 1000,
          }
        }
      }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      
      {/* Blinking cursor */}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block ml-1"
      >
        |
      </motion.span>
    </motion.div>
  )
}
