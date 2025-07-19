"use client"

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function ImmersiveCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
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

      {/* Cursor trail */}
      <motion.div
        className={`fixed top-0 left-0 w-12 h-12 pointer-events-none z-40 ${
          isVisible ? 'opacity-30' : 'opacity-0'
        }`}
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
            scale: isClicking ? 1.5 : 1,
            opacity: isClicking ? 0.5 : 0.3,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  )
}

// Ripple effect on click
export function ClickRipple() {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    const createRipple = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }
      
      setRipples(prev => [...prev, newRipple])
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
      }, 1000)
    }

    window.addEventListener('click', createRipple)
    return () => window.removeEventListener('click', createRipple)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full border-2 border-purple-400"
          style={{
            left: ripple.x - 25,
            top: ripple.y - 25,
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 100, height: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}
