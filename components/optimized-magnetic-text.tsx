"use client"

import { useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface OptimizedMagneticTextProps {
  children: string
  className?: string
  strength?: number
}

export function OptimizedMagneticText({ 
  children, 
  className = "", 
  strength = 30 
}: OptimizedMagneticTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = useMemo(() => ({ 
    damping: 30, 
    stiffness: 400 
  }), [])
  
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const element = ref.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    )
    
    if (distance < 100) {
      const force = (100 - distance) / 100
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
      style={{ x: xSpring, y: ySpring }}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface OptimizedFloatingLettersProps {
  text: string
  className?: string
}

export function OptimizedFloatingLetters({ text, className = "" }: OptimizedFloatingLettersProps) {
  const letters = useMemo(() => text.split(''), [text])
  
  return (
    <div className={`inline-flex ${className}`}>
      {letters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{ 
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.2,
            color: "#a855f7",
            transition: { duration: 0.2 }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}

interface OptimizedWaveTextProps {
  text: string
  className?: string
}

export function OptimizedWaveText({ text, className = "" }: OptimizedWaveTextProps) {
  const letters = useMemo(() => text.split(''), [text])
  
  return (
    <div className={`inline-flex ${className}`}>
      {letters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.08,
            ease: "easeInOut"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}

interface OptimizedGlitchTextProps {
  text: string
  className?: string
}

export function OptimizedGlitchText({ text, className = "" }: OptimizedGlitchTextProps) {
  return (
    <motion.div 
      className={`relative inline-block ${className}`}
      whileHover="hover"
    >
      <motion.span
        variants={{
          hover: {
            textShadow: [
              "1px 0 0 #ff0000, -1px 0 0 #00ffff",
              "-1px 0 0 #ff0000, 1px 0 0 #00ffff",
            ],
            x: [0, 1, -1, 0],
          }
        }}
        transition={{
          duration: 0.2,
          repeat: 2,
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  )
}
