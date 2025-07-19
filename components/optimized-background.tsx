"use client"

import { useRef, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Reduced particle count for better performance
function OptimizedParticles() {
  const ref = useRef<THREE.Points>(null!)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1000 * 3) // Reduced from 5000 to 1000
    
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

// Simplified floating sphere with reduced complexity
function OptimizedFloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={[2, 0, -5]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
    </mesh>
  )
}

export function OptimizedStunningBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Simplified CSS Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-emerald-900/10" />
      
      {/* Optimized 3D Canvas */}
      <div className="absolute inset-0 opacity-40">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ 
            antialias: false, 
            alpha: true, 
            powerPreference: "high-performance",
            stencil: false,
            depth: false
          }}
        >
          <OptimizedParticles />
          <OptimizedFloatingSphere />
        </Canvas>
      </div>
      
      {/* Simple animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

// Simplified visual effects
export function OptimizedVisualEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {/* Floating orbs with reduced animation */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Simple geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-purple-500"
              animate={{
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
