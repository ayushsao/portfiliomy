"use client"

import { useEffect, useState, useCallback, useMemo } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function OptimizedImmersiveCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = useMemo(() => ({ 
    damping: 25, 
    stiffness: 700 
  }), [])
  
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX - 16)
    cursorY.set(e.clientY - 16)
    setIsVisible(true)
  }, [cursorX, cursorY])

  const handleMouseDown = useCallback(() => setIsClicking(true), [])
  const handleMouseUp = useCallback(() => setIsClicking(false), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])
  const handleMouseEnter = useCallback(() => setIsVisible(true), [])

  useEffect(() => {
    window.addEventListener('mousemove', moveCursor, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    window.addEventListener('mouseenter', handleMouseEnter, { passive: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [moveCursor, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-white"
          animate={{
            scale: isClicking ? 0.5 : 1,
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Cursor trail - only show on hover for performance */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-40 opacity-20"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          marginLeft: '-8px',
          marginTop: '-8px',
        }}
      >
        <motion.div
          className="w-full h-full rounded-full border-2 border-purple-500"
          animate={{
            scale: isClicking ? 1.2 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  )
}

// Simplified click ripple with better performance
export function OptimizedClickRipple() {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const createRipple = useCallback((e: MouseEvent) => {
    const newRipple = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    }
    
    setRipples(prev => [...prev.slice(-2), newRipple]) // Keep only last 3 ripples
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 800)
  }, [])

  useEffect(() => {
    window.addEventListener('click', createRipple, { passive: true })
    return () => window.removeEventListener('click', createRipple)
  }, [createRipple])

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full border border-purple-400"
          style={{
            left: ripple.x - 25,
            top: ripple.y - 25,
          }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 80, height: 80, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}
