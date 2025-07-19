"use client"

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

// Animated geometric patterns
export function GeometricPatterns() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    })
  }, [controls])

  return (
    <div className="absolute inset-0 -z-7 pointer-events-none overflow-hidden opacity-10">
      {/* Hexagonal pattern */}
      <motion.div
        className="absolute top-10 left-10"
        animate={controls}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <polygon
            points="50,10 80,30 80,70 50,90 20,70 20,30"
            fill="none"
            stroke="url(#hexGradient)"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Triangle pattern */}
      <motion.div
        className="absolute top-32 right-20"
        animate={{
          rotate: [0, -360],
          transition: { duration: 15, repeat: Infinity, ease: "linear" }
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <polygon
            points="40,10 70,60 10,60"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Circle pattern */}
      <motion.div
        className="absolute bottom-20 left-32"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
          transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
      </motion.div>
    </div>
  )
}

// Pulsing energy waves
export function EnergyWaves() {
  const waves = Array.from({ length: 5 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full border border-purple-500/20"
      style={{
        width: `${100 + i * 50}px`,
        height: `${100 + i * 50}px`,
        left: '50%',
        top: '50%',
        marginLeft: `-${50 + i * 25}px`,
        marginTop: `-${50 + i * 25}px`,
      }}
      animate={{
        scale: [1, 2, 1],
        opacity: [0.8, 0, 0.8],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeOut",
        delay: i * 0.5,
      }}
    />
  ))

  return (
    <div className="absolute inset-0 -z-6 pointer-events-none flex items-center justify-center">
      {waves}
    </div>
  )
}

// Code rain effect (enhanced Matrix style)
export function CodeRain() {
  const [codeChars] = useState([
    '0', '1', '{', '}', '<', '>', '/', '\\', '=', '+', '-', '*', '%', '$', '#', '@'
  ])
  
  const [streams, setStreams] = useState<Array<{
    id: number
    left: number
    chars: string[]
    speed: number
  }>>([])

  useEffect(() => {
    const newStreams = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      chars: Array.from({ length: 10 }, () => 
        codeChars[Math.floor(Math.random() * codeChars.length)]
      ),
      speed: 2 + Math.random() * 3
    }))
    setStreams(newStreams)
  }, [codeChars])

  return (
    <div className="absolute inset-0 -z-8 pointer-events-none overflow-hidden opacity-30">
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute flex flex-col font-mono text-sm text-green-400"
          style={{ left: `${stream.left}%` }}
          animate={{
            y: [-200, window.innerHeight + 200],
          }}
          transition={{
            duration: stream.speed,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 3,
          }}
        >
          {stream.chars.map((char, index) => (
            <motion.span
              key={index}
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: index * 0.1,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

// Glitch effect overlay
export function GlitchOverlay() {
  return (
    <motion.div
      className="absolute inset-0 -z-5 pointer-events-none"
      animate={{
        opacity: [0, 0.1, 0],
        background: [
          "linear-gradient(45deg, transparent 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)",
          "linear-gradient(-45deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)",
          "linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%)",
        ],
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    />
  )
}

// Scrolling circuit board pattern
export function CircuitBoard() {
  return (
    <div className="absolute inset-0 -z-9 pointer-events-none opacity-5">
      <motion.div
        className="w-full h-full"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `
            linear-gradient(90deg, #8B5CF6 1px, transparent 1px),
            linear-gradient(180deg, #8B5CF6 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  )
}

// Data visualization particles
export function DataParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: ['purple', 'blue', 'emerald', 'pink'][Math.floor(Math.random() * 4)],
  }))

  return (
    <div className="absolute inset-0 -z-7 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-${particle.color}-500/30 blur-sm`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

// Combined effects component
export function AdvancedVisualEffects() {
  return (
    <>
      <GeometricPatterns />
      <EnergyWaves />
      <CodeRain />
      <GlitchOverlay />
      <CircuitBoard />
      <DataParticles />
    </>
  )
}
