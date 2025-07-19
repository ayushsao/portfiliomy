"use client"

import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface MagneticTextProps {
  children: string
  className?: string
  strength?: number
}

export function MagneticText({ children, className = "", strength = 50 }: MagneticTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      )
      
      if (distance < 150) {
        const force = (150 - distance) / 150
        x.set((e.clientX - centerX) * force * (strength / 100))
        y.set((e.clientY - centerY) * force * (strength / 100))
      } else {
        x.set(0)
        y.set(0)
      }
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [x, y, strength])

  return (
    <motion.div
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      className={`inline-block ${className}`}
    >
      {children.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          whileHover={{ 
            scale: 1.2,
            textShadow: "0 0 20px rgba(168, 85, 247, 0.5)"
          }}
          transition={{ duration: 0.2 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}

interface FloatingLettersProps {
  text: string
  className?: string
}

export function FloatingLetters({ text, className = "" }: FloatingLettersProps) {
  return (
    <div className={`inline-flex ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: 0 }}
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, Math.random() * 10 - 5, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.3,
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

interface WaveTextProps {
  text: string
  className?: string
}

export function WaveText({ text, className = "" }: WaveTextProps) {
  return (
    <div className={`inline-flex ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
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
            x: [0, 2, -2, 0],
          }
        }}
        transition={{
          duration: 0.3,
          repeat: 3,
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  )
}
