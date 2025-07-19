"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Sphere, 
  MeshDistortMaterial, 
  Float, 
  Stars,
  Sparkles,
  Cloud,
  Environment,
  Backdrop,
  MeshTransmissionMaterial,
  useTexture
} from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'

// Animated particles system
function ParticleSystem() {
  const points = useRef<THREE.Points>(null)
  const particleCount = 5000

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      colors[i * 3] = Math.random()
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5
      colors[i * 3 + 2] = 1
    }

    return [positions, colors]
  }, [particleCount])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.1
      points.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Floating geometric shapes
function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        scale={hovered ? 1.2 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <dodecahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.8}
          roughness={0.1}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#8B5CF6"
        />
      </mesh>
    </Float>
  )
}

// Morphing sphere with dynamic material
function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
      
      // Dynamic distortion
      materialRef.current.distort = 0.3 + Math.sin(state.clock.elapsedTime) * 0.2
      materialRef.current.speed = 1.5 + Math.cos(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[-4, 0, -2]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#3B82F6"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

// Animated DNA helix
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  
  const helixGeometry = useMemo(() => {
    const points = []
    const colors = []
    
    for (let i = 0; i < 100; i++) {
      const t = i / 100
      const angle1 = t * Math.PI * 8
      const angle2 = angle1 + Math.PI
      
      // First strand
      points.push(
        Math.cos(angle1) * 0.5,
        t * 4 - 2,
        Math.sin(angle1) * 0.5
      )
      
      // Second strand
      points.push(
        Math.cos(angle2) * 0.5,
        t * 4 - 2,
        Math.sin(angle2) * 0.5
      )
      
      // Colors
      colors.push(0.5, 0.3, 1, 1, 0.3, 0.5)
    }
    
    return { points: new Float32Array(points), colors: new Float32Array(colors) }
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <group ref={groupRef} position={[4, 0, -2]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={helixGeometry.points.length / 3}
            array={helixGeometry.points}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={helixGeometry.colors.length / 3}
            array={helixGeometry.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  )
}

// Holographic plane
function HolographicPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} rotation={[0, 0, 0]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <meshStandardMaterial
        color="#8B5CF6"
        transparent
        opacity={0.1}
        wireframe
      />
    </mesh>
  )
}

// Main 3D background component
export function Advanced3DBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ height: '100%' }}
        dpr={[1, 2]}
      >
        {/* Environment and lighting */}
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#8B5CF6" />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#3B82F6" />
        <pointLight position={[0, 0, 0]} intensity={0.5} color="#10B981" />
        
        {/* Background elements */}
        <Stars radius={300} depth={60} count={3000} factor={7} saturation={0} fade />
        <Sparkles count={100} scale={[20, 20, 20]} size={2} speed={0.4} />
        
        {/* 3D Objects */}
        <ParticleSystem />
        <FloatingGeometry />
        <MorphingSphere />
        <DNAHelix />
        <HolographicPlane />
        
        {/* Backdrop with gradient */}
        <Backdrop
          floor={20}
          segments={100}
          position={[0, -2, -10]}
        >
          <meshStandardMaterial color="#0F0F23" />
        </Backdrop>
        
        {/* Auto-rotate camera */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}

// Animated gradient overlay
export function AnimatedGradientOverlay() {
  return (
    <motion.div
      className="absolute inset-0 -z-5 opacity-30"
      animate={{
        background: [
          "radial-gradient(circle at 20% 80%, #8B5CF6 0%, transparent 50%)",
          "radial-gradient(circle at 80% 20%, #3B82F6 0%, transparent 50%)",
          "radial-gradient(circle at 40% 40%, #10B981 0%, transparent 50%)",
          "radial-gradient(circle at 20% 80%, #8B5CF6 0%, transparent 50%)",
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

// Floating orbs
export function FloatingOrbs() {
  const orbs = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className={`absolute w-4 h-4 rounded-full blur-sm ${
        i % 3 === 0 ? 'bg-purple-500' : i % 3 === 1 ? 'bg-blue-500' : 'bg-emerald-500'
      }`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.5,
      }}
    />
  ))

  return (
    <div className="absolute inset-0 -z-8 pointer-events-none overflow-hidden">
      {orbs}
    </div>
  )
}

// Matrix rain effect
export function MatrixRain() {
  const [drops, setDrops] = useState<Array<{ id: number; left: number; delay: number }>>([])

  useEffect(() => {
    const newDrops = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setDrops(newDrops)
  }, [])

  return (
    <div className="absolute inset-0 -z-9 pointer-events-none overflow-hidden opacity-20">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute w-0.5 h-20 bg-gradient-to-b from-green-400 to-transparent"
          style={{ left: `${drop.left}%` }}
          animate={{
            y: [-100, window.innerHeight + 100],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: drop.delay,
          }}
        />
      ))}
    </div>
  )
}

// Combined stunning background
export function StunningBackground() {
  return (
    <>
      <Advanced3DBackground />
      <AnimatedGradientOverlay />
      <FloatingOrbs />
      <MatrixRain />
    </>
  )
}
