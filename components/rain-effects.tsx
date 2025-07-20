"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import * as THREE from 'three'

// Audio System for Rain Effects
function useAudioSystem() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const rainSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const ambientOscillatorRef = useRef<OscillatorNode | null>(null)
  const airplaneOscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const airplaneGainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    // Initialize Audio Context
    const initAudioContext = () => {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioContext(ctx)
      
      // Create main gain node for volume control
      const gainNode = ctx.createGain()
      gainNode.connect(ctx.destination)
      gainNode.gain.value = volume
      gainNodeRef.current = gainNode

      // Create airplane gain node
      const airplaneGain = ctx.createGain()
      airplaneGain.connect(gainNode)
      airplaneGain.gain.value = 0.1
      airplaneGainRef.current = airplaneGain
    }

    // Create rain sound using Web Audio API
    const createAndStartRainSound = () => {
      if (!audioContext || !gainNodeRef.current) return

      // Create white noise buffer for rain
      const bufferSize = audioContext.sampleRate * 2
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
      const output = buffer.getChannelData(0)

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }

      const whiteNoise = audioContext.createBufferSource()
      whiteNoise.buffer = buffer
      whiteNoise.loop = true

      // Create filter chain for realistic rain sound
      const lowpass = audioContext.createBiquadFilter()
      lowpass.type = 'lowpass'
      lowpass.frequency.value = 1200
      lowpass.Q.value = 1

      const highpass = audioContext.createBiquadFilter()
      highpass.type = 'highpass'
      highpass.frequency.value = 150
      highpass.Q.value = 0.5

      const rainGain = audioContext.createGain()
      rainGain.gain.value = 0.3

      whiteNoise.connect(lowpass)
      lowpass.connect(highpass)
      highpass.connect(rainGain)
      rainGain.connect(gainNodeRef.current)

      rainSourceRef.current = whiteNoise
      if (isPlaying) {
        whiteNoise.start()
      }
    }

    // Create ambient atmospheric sound
    const createAndStartAmbientSound = () => {
      if (!audioContext || !gainNodeRef.current) return

      const oscillator = audioContext.createOscillator()
      const ambientGain = audioContext.createGain()
      
      oscillator.type = 'sine'
      oscillator.frequency.value = 80 // Deep atmospheric hum
      ambientGain.gain.value = 0.05
      
      oscillator.connect(ambientGain)
      ambientGain.connect(gainNodeRef.current)

      ambientOscillatorRef.current = oscillator
      if (isPlaying) {
        oscillator.start()
      }
    }

    // Create airplane engine sound
    const createAirplaneSound = () => {
      if (!audioContext || !airplaneGainRef.current) return

      const oscillator = audioContext.createOscillator()
      oscillator.type = 'sawtooth'
      oscillator.frequency.value = 120 // Engine-like frequency
      
      // Add some vibrato for realistic engine sound
      const lfo = audioContext.createOscillator()
      const lfoGain = audioContext.createGain()
      lfo.type = 'sine'
      lfo.frequency.value = 5 // Vibrato rate
      lfoGain.gain.value = 10 // Vibrato depth
      
      lfo.connect(lfoGain)
      lfoGain.connect(oscillator.frequency)
      
      oscillator.connect(airplaneGainRef.current)
      
      airplaneOscillatorRef.current = oscillator
      if (isPlaying) {
        oscillator.start()
        lfo.start()
      }
    }

    if (audioContext) {
      if (isPlaying) {
        createAndStartRainSound()
        createAndStartAmbientSound()
        createAirplaneSound()
      }
    } else {
      initAudioContext()
    }

    return () => {
      // Cleanup when component unmounts or isPlaying changes
      if (rainSourceRef.current) {
        try {
          rainSourceRef.current.stop()
        } catch (e) {
          // Ignore errors if already stopped
        }
        rainSourceRef.current = null
      }
      if (ambientOscillatorRef.current) {
        try {
          ambientOscillatorRef.current.stop()
        } catch (e) {
          // Ignore errors if already stopped
        }
        ambientOscillatorRef.current = null
      }
      if (airplaneOscillatorRef.current) {
        try {
          airplaneOscillatorRef.current.stop()
        } catch (e) {
          // Ignore errors if already stopped
        }
        airplaneOscillatorRef.current = null
      }
    }
  }, [audioContext, isPlaying, volume])

  const playAudio = useCallback(() => {
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume()
    }
    setIsPlaying(true)
  }, [audioContext])

  const stopAudio = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const updateVolume = useCallback((newVolume: number) => {
    setVolume(newVolume)
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(newVolume, audioContext?.currentTime || 0, 0.1)
    }
  }, [audioContext])

  const updateRainIntensity = useCallback((intensity: string, scrollVelocity: number) => {
    if (gainNodeRef.current && airplaneGainRef.current && isPlaying) {
      // Adjust volume based on rain intensity and scroll velocity
      const baseVolume = volume
      const scrollBoost = Math.min(Math.abs(scrollVelocity) * 0.001, 0.3)
      const intensityMultiplier = intensity === 'heavy' ? 1.2 : intensity === 'medium' ? 1.0 : 0.8
      const finalVolume = Math.min(baseVolume * intensityMultiplier + scrollBoost, 1.0)
      
      gainNodeRef.current.gain.setTargetAtTime(finalVolume, audioContext?.currentTime || 0, 0.1)
      
      // Adjust airplane volume based on scroll (more airplanes = louder)
      const airplaneVolume = Math.min(0.1 + Math.abs(scrollVelocity) * 0.0005, 0.4)
      airplaneGainRef.current.gain.setTargetAtTime(airplaneVolume, audioContext?.currentTime || 0, 0.2)
      
      // Modulate airplane frequency based on scroll
      if (airplaneOscillatorRef.current) {
        const frequencyVariation = 120 + Math.sin(Date.now() * 0.001) * 20 + Math.abs(scrollVelocity) * 0.1
        airplaneOscillatorRef.current.frequency.setTargetAtTime(frequencyVariation, audioContext?.currentTime || 0, 0.3)
      }
    }
  }, [volume, audioContext, isPlaying])

  return {
    isPlaying,
    volume,
    playAudio,
    stopAudio,
    updateVolume,
    updateRainIntensity,
  }
}

// Enhanced Audio Controller Component
function AudioController({ rainType, intensity, scrollVelocity }: { 
  rainType: string, 
  intensity: string, 
  scrollVelocity: number 
}) {
  const audio = useAudioSystem()
  const [showController, setShowController] = useState(false)

  useEffect(() => {
    audio.updateRainIntensity(intensity, scrollVelocity)
  }, [intensity, scrollVelocity, audio])

  const handleToggleAudio = () => {
    if (audio.isPlaying) {
      audio.stopAudio()
    } else {
      audio.playAudio()
    }
  }

  if (!showController) {
    return (
      <button
        onClick={() => setShowController(true)}
        className="fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/90 transition-all duration-200"
        style={{ 
          boxShadow: audio.isPlaying 
            ? `0 0 ${Math.min(Math.abs(scrollVelocity) * 0.05 + 10, 20)}px rgba(34, 197, 94, 0.5)` 
            : 'none',
          borderColor: audio.isPlaying ? 'rgba(34, 197, 94, 0.5)' : 'transparent',
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
      >
        🎵
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white min-w-[200px] transition-all duration-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold">Audio Control</h3>
        <button
          onClick={() => setShowController(false)}
          className="text-gray-400 hover:text-white text-xs"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-3">
        {/* Play/Pause Button */}
        <button
          onClick={handleToggleAudio}
          className={`w-full py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            audio.isPlaying 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          {audio.isPlaying ? '⏸️ Pause Audio' : '▶️ Play Audio'}
        </button>

        {/* Volume Control */}
        <div>
          <label className="text-xs text-gray-300 block mb-2">
            Volume: {Math.round(audio.volume * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={audio.volume}
            onChange={(e) => audio.updateVolume(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${audio.volume * 100}%, #374151 ${audio.volume * 100}%, #374151 100%)`
            }}
          />
        </div>

        {/* Audio Visualizer */}
        <div className="bg-gray-800/50 rounded p-2 border border-gray-700">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-300">Audio Activity</span>
            <span className="text-xs text-green-400">
              {audio.isPlaying ? '🔊' : '🔇'}
            </span>
          </div>
          <div className="flex items-center gap-1 h-6">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="flex-1 bg-gray-700 rounded-sm transition-all duration-100"
                style={{ 
                  height: audio.isPlaying 
                    ? `${Math.min(20 + Math.abs(scrollVelocity) * 0.1 + Math.random() * 20, 100)}%`
                    : '10%',
                  backgroundColor: audio.isPlaying 
                    ? `hsl(${120 + i * 10}, 70%, 50%)` 
                    : '#374151'
                }}
              />
            ))}
          </div>
        </div>

        {/* Audio Info */}
        <div className="text-xs text-gray-400 space-y-1">
          <div>Rain Type: {rainType}</div>
          <div>Intensity: {intensity}</div>
          <div className="text-blue-400">🎧 Immersive audio experience</div>
        </div>
      </div>
    </div>
  )
}

// Moving Airplane Component
function MovingAirplane({ index = 0, scrollVelocity = 0 }) {
  const airplaneRef = useRef<THREE.Group>(null)
  const trailRef = useRef<THREE.Points>(null)
  const [propellerRotation, setPropellerRotation] = useState(0)
  
  // Airplane properties
  const airplaneData = useMemo(() => {
    const speed = 0.3 + Math.random() * 0.2
    const altitude = -2 + Math.random() * 4 // Y position
    const startX = -30 - Math.random() * 10
    const startZ = (Math.random() - 0.5) * 20
    const direction = Math.random() > 0.5 ? 1 : -1 // Left to right or right to left
    
    return {
      speed,
      altitude,
      startX: direction > 0 ? startX : -startX,
      startZ,
      direction,
      currentX: direction > 0 ? startX : -startX,
      phase: Math.random() * Math.PI * 2, // For sine wave movement
    }
  }, [index])

  // Trail particles
  const [trailPositions, trailOpacities] = useMemo(() => {
    const trailLength = 50
    const positions = new Float32Array(trailLength * 3)
    const opacities = new Float32Array(trailLength)
    
    for (let i = 0; i < trailLength; i++) {
      positions[i * 3] = -100 // Start off-screen
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = 0
      opacities[i] = (trailLength - i) / trailLength * 0.8
    }
    
    return [positions, opacities]
  }, [])

  useFrame((state, delta) => {
    if (airplaneRef.current && trailRef.current) {
      const airplane = airplaneData
      
      // Update propeller rotation
      setPropellerRotation(state.clock.elapsedTime * 20)
      
      // Enhanced movement with scroll influence
      const scrollSpeedBoost = 1 + Math.abs(scrollVelocity) * 0.001
      const baseSpeed = airplane.speed * scrollSpeedBoost
      
      // Update airplane position
      airplane.currentX += airplane.direction * baseSpeed * delta * 60
      
      // Sine wave movement for natural flight path
      const sineY = Math.sin(state.clock.elapsedTime * 0.5 + airplane.phase) * 0.5
      const sineZ = Math.cos(state.clock.elapsedTime * 0.3 + airplane.phase) * 0.3
      
      // Scroll-responsive movement
      const scrollY = scrollVelocity * 0.002
      const scrollZ = scrollVelocity * 0.001
      
      // Set airplane position
      airplaneRef.current.position.set(
        airplane.currentX,
        airplane.altitude + sineY + scrollY,
        airplane.startZ + sineZ + scrollZ
      )
      
      // Rotate airplane for banking effect
      const bank = sineZ * 0.3 + scrollVelocity * 0.0001
      airplaneRef.current.rotation.set(
        bank * 0.5,
        airplane.direction > 0 ? 0 : Math.PI,
        bank
      )
      
      // Update trail
      const positions = trailRef.current.geometry.attributes.position.array as Float32Array
      const trailLength = positions.length / 3
      
      // Shift trail positions
      for (let i = trailLength - 1; i > 0; i--) {
        positions[i * 3] = positions[(i - 1) * 3]
        positions[i * 3 + 1] = positions[(i - 1) * 3 + 1]
        positions[i * 3 + 2] = positions[(i - 1) * 3 + 2]
      }
      
      // Add new trail point at airplane position
      positions[0] = airplane.currentX - airplane.direction * 2
      positions[1] = airplane.altitude + sineY + scrollY
      positions[2] = airplane.startZ + sineZ + scrollZ
      
      trailRef.current.geometry.attributes.position.needsUpdate = true
      
      // Reset airplane when it goes off-screen
      if (airplane.direction > 0 && airplane.currentX > 40) {
        airplane.currentX = -30 - Math.random() * 10
        airplane.startZ = (Math.random() - 0.5) * 20
        airplane.phase = Math.random() * Math.PI * 2
      } else if (airplane.direction < 0 && airplane.currentX < -40) {
        airplane.currentX = 30 + Math.random() * 10
        airplane.startZ = (Math.random() - 0.5) * 20
        airplane.phase = Math.random() * Math.PI * 2
      }
    }
  })

  return (
    <group>
      {/* Airplane Model */}
      <group ref={airplaneRef}>
        {/* Fuselage */}
        <mesh>
          <cylinderGeometry args={[0.1, 0.15, 2, 8]} />
          <meshBasicMaterial color="#e0e0e0" />
        </mesh>
        
        {/* Wings */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[3, 0.05, 0.3]} />
          <meshBasicMaterial color="#d0d0d0" />
        </mesh>
        
        {/* Tail */}
        <mesh position={[0, 0.3, -0.8]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[1, 0.05, 0.4]} />
          <meshBasicMaterial color="#d0d0d0" />
        </mesh>
        
        {/* Vertical Tail */}
        <mesh position={[0, 0.2, -0.8]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.6, 0.05, 0.3]} />
          <meshBasicMaterial color="#d0d0d0" />
        </mesh>
        
        {/* Propeller (rotating) */}
        <mesh position={[0, 0, 1]} rotation={[0, propellerRotation, 0]}>
          <boxGeometry args={[0.05, 1.5, 0.05]} />
          <meshBasicMaterial color="#8b4513" />
        </mesh>
      </group>
      
      {/* Airplane Trail */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[trailPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#ffffff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

// Multiple Airplanes Manager
function AirplaneFleet({ scrollVelocity = 0 }) {
  const airplaneCount = 3 + Math.floor(Math.abs(scrollVelocity) / 200) // More planes on fast scroll
  
  return (
    <>
      {Array.from({ length: Math.min(airplaneCount, 6) }, (_, i) => (
        <MovingAirplane key={i} index={i} scrollVelocity={scrollVelocity} />
      ))}
    </>
  )
}

// Rain Drops Component with Scroll Response
function RainDrops({ count = 5000, scrollVelocity = 0 }) {
  const mesh = useRef<THREE.Points>(null)
  
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20 // x
      positions[i * 3 + 1] = Math.random() * 20 // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 // z
      velocities[i] = Math.random() * 0.1 + 0.05 // fall speed
    }
    
    return [positions, velocities]
  }, [count])

  useFrame((state, delta) => {
    if (mesh.current && mesh.current.geometry.attributes.position) {
      const positions = mesh.current.geometry.attributes.position.array as Float32Array
      
      // Enhanced scroll-responsive effects
      const scrollMultiplier = 1 + Math.abs(scrollVelocity) * 0.015
      const horizontalDrift = scrollVelocity * 0.008
      const verticalBoost = scrollVelocity > 0 ? scrollVelocity * 0.01 : 0
      
      for (let i = 0; i < count; i++) {
        // Apply scroll-enhanced falling speed with direction influence
        const fallSpeed = velocities[i] * delta * 60 * scrollMultiplier
        positions[i * 3 + 1] -= fallSpeed + verticalBoost
        
        // Enhanced horizontal drift with scroll momentum
        positions[i * 3] += horizontalDrift * delta * 60
        
        // Add scroll-based wave motion
        const wave = Math.sin(state.clock.elapsedTime * 2 + i * 0.1 + scrollVelocity * 0.01) * 0.03
        positions[i * 3] += wave * Math.abs(scrollVelocity) * 0.001 * delta * 60
        
        // Scroll-responsive z-axis movement for depth effect
        positions[i * 3 + 2] += (scrollVelocity * 0.002) * delta * 60
        
        // Reset raindrop when it falls below the screen
        if (positions[i * 3 + 1] < -10) {
          positions[i * 3 + 1] = 10 + Math.random() * 5 // Randomize spawn height
          positions[i * 3] = (Math.random() - 0.5) * 20
          positions[i * 3 + 2] = (Math.random() - 0.5) * 20
        }
        
        // Enhanced boundary wrapping with scroll consideration
        if (positions[i * 3] > 10) positions[i * 3] = -10
        if (positions[i * 3] < -10) positions[i * 3] = 10
        if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -10
        if (positions[i * 3 + 2] < -10) positions[i * 3 + 2] = 10
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true
    }
  })

  // Dynamic opacity based on scroll velocity
  const opacity = Math.min(0.8 + Math.abs(scrollVelocity) * 0.002, 1.0)

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02 + Math.abs(scrollVelocity) * 0.0001}
        color="#4FC3F7"
        transparent
        opacity={opacity}
        sizeAttenuation
      />
    </points>
  )
}

// Matrix-style Digital Rain with Scroll Effects
function MatrixRain({ count = 1000, scrollVelocity = 0 }) {
  const mesh = useRef<THREE.Points>(null)
  
  const [positions, velocities, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = Math.random() * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      velocities[i] = Math.random() * 0.15 + 0.1
      
      // Green matrix colors
      colors[i * 3] = 0 // r
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5 // g
      colors[i * 3 + 2] = 0 // b
    }
    
    return [positions, velocities, colors]
  }, [count])

  useFrame((state, delta) => {
    if (mesh.current && mesh.current.geometry.attributes.position && mesh.current.geometry.attributes.color) {
      const positions = mesh.current.geometry.attributes.position.array as Float32Array
      const colors = mesh.current.geometry.attributes.color.array as Float32Array
      
      // Enhanced scroll-responsive effects for Matrix style
      const scrollMultiplier = 1 + Math.abs(scrollVelocity) * 0.02
      const flickerIntensity = 1 + Math.abs(scrollVelocity) * 0.002
      const matrixShift = scrollVelocity * 0.005
      
      for (let i = 0; i < count; i++) {
        // Enhanced falling with scroll boost
        positions[i * 3 + 1] -= velocities[i] * delta * 60 * scrollMultiplier
        
        // Matrix-style enhanced flickering with scroll intensity
        const flicker = (Math.random() * 0.5 + 0.5) * flickerIntensity
        colors[i * 3 + 1] = Math.min(flicker, 2.0)
        
        // Digital rain scroll-based lateral shift
        positions[i * 3] += matrixShift * delta * 60
        
        // Add "digital glitch" effect on fast scroll
        if (Math.abs(scrollVelocity) > 100) {
          const glitch = (Math.random() - 0.5) * 0.1
          positions[i * 3] += glitch * delta * 60
          positions[i * 3 + 2] += glitch * 0.5 * delta * 60
        }
        
        // Scroll-based depth movement for 3D effect
        positions[i * 3 + 2] += (scrollVelocity * 0.003) * delta * 60
        
        // Reset with scroll-influenced spawn
        if (positions[i * 3 + 1] < -10) {
          positions[i * 3 + 1] = 10 + Math.random() * 3
          positions[i * 3] = (Math.random() - 0.5) * 20
          positions[i * 3 + 2] = (Math.random() - 0.5) * 20
        }
        
        // Enhanced boundary management
        if (positions[i * 3] > 10) positions[i * 3] = -10
        if (positions[i * 3] < -10) positions[i * 3] = 10
        if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -10
        if (positions[i * 3 + 2] < -10) positions[i * 3 + 2] = 10
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true
      mesh.current.geometry.attributes.color.needsUpdate = true
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05 + Math.abs(scrollVelocity) * 0.0002}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  )
}

// Neon Rain Effect with Scroll Interaction
function NeonRain({ count = 2000, scrollVelocity = 0 }) {
  const mesh = useRef<THREE.Points>(null)
  
  const [positions, velocities, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    
    const neonColors = [
      [1, 0, 1], // Magenta
      [0, 1, 1], // Cyan
      [1, 0.5, 0], // Orange
      [0.5, 0, 1], // Purple
      [1, 1, 0], // Yellow
    ]
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = Math.random() * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      velocities[i] = Math.random() * 0.15 + 0.08
      
      const color = neonColors[Math.floor(Math.random() * neonColors.length)]
      colors[i * 3] = color[0]
      colors[i * 3 + 1] = color[1]
      colors[i * 3 + 2] = color[2]
    }
    
    return [positions, velocities, colors]
  }, [count])

  useFrame((state, delta) => {
    if (mesh.current && mesh.current.geometry.attributes.position && mesh.current.geometry.attributes.color) {
      const positions = mesh.current.geometry.attributes.position.array as Float32Array
      const colors = mesh.current.geometry.attributes.color.array as Float32Array
      
      // Enhanced scroll-responsive neon effects
      const scrollMultiplier = 1 + Math.abs(scrollVelocity) * 0.025
      const glowMultiplier = 1 + Math.abs(scrollVelocity) * 0.005
      const swirlIntensity = Math.abs(scrollVelocity) * 0.0001
      
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] -= velocities[i] * delta * 60 * scrollMultiplier
        
        // Enhanced glowing effect with scroll amplification
        const baseGlow = Math.sin(state.clock.elapsedTime * 3 + i) * 0.3 + 0.7
        const scrollGlow = baseGlow * glowMultiplier
        const baseIndex = i * 3
        
        // Apply enhanced glow with scroll influence
        colors[baseIndex] = Math.min(colors[baseIndex] * scrollGlow, 3.0)
        colors[baseIndex + 1] = Math.min(colors[baseIndex + 1] * scrollGlow, 3.0)
        colors[baseIndex + 2] = Math.min(colors[baseIndex + 2] * scrollGlow, 3.0)
        
        // Enhanced scroll-based swirl and spiral effects
        const time = state.clock.elapsedTime + scrollVelocity * 0.01
        const swirlX = Math.sin(time + i * 0.1) * swirlIntensity * 50
        const swirlZ = Math.cos(time + i * 0.1) * swirlIntensity * 30
        
        positions[i * 3] += swirlX * delta * 60
        positions[i * 3 + 2] += swirlZ * delta * 60
        
        // Scroll-based lateral drift with enhanced movement
        const lateralDrift = scrollVelocity * 0.006
        positions[i * 3] += lateralDrift * delta * 60
        
        // Add scroll-influenced spiral motion
        if (Math.abs(scrollVelocity) > 50) {
          const spiral = Math.sin(time * 2 + i * 0.2) * Math.abs(scrollVelocity) * 0.00005
          positions[i * 3] += spiral * Math.cos(time) * delta * 60
          positions[i * 3 + 2] += spiral * Math.sin(time) * delta * 60
        }
        
        // Reset with enhanced spawn variation
        if (positions[i * 3 + 1] < -10) {
          positions[i * 3 + 1] = 10 + Math.random() * 4
          positions[i * 3] = (Math.random() - 0.5) * 20
          positions[i * 3 + 2] = (Math.random() - 0.5) * 20
        }
        
        // Enhanced boundary wrapping with scroll momentum
        const boundaryBuffer = Math.abs(scrollVelocity) > 100 ? 12 : 10
        if (positions[i * 3] > boundaryBuffer) positions[i * 3] = -boundaryBuffer
        if (positions[i * 3] < -boundaryBuffer) positions[i * 3] = boundaryBuffer
        if (positions[i * 3 + 2] > boundaryBuffer) positions[i * 3 + 2] = -boundaryBuffer
        if (positions[i * 3 + 2] < -boundaryBuffer) positions[i * 3 + 2] = boundaryBuffer
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true
      mesh.current.geometry.attributes.color.needsUpdate = true
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04 + Math.abs(scrollVelocity) * 0.0003}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Particle Rain with Scroll Physics
function ParticleRain({ count = 3000, scrollVelocity = 0 }) {
  const mesh = useRef<THREE.Points>(null)
  
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = Math.random() * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02 // x drift
      velocities[i * 3 + 1] = Math.random() * 0.2 + 0.1 // y fall
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02 // z drift
    }
    
    return [positions, velocities]
  }, [count])

  useFrame((state, delta) => {
    if (mesh.current && mesh.current.geometry.attributes.position) {
      const positions = mesh.current.geometry.attributes.position.array as Float32Array
      
      // Advanced scroll-responsive physics
      const scrollMultiplier = 1 + Math.abs(scrollVelocity) * 0.03
      const scrollForce = scrollVelocity * 0.012
      const turbulenceIntensity = Math.abs(scrollVelocity) * 0.0002
      
      for (let i = 0; i < count; i++) {
        // Enhanced physics with scroll amplification
        const baseXVel = velocities[i * 3] + scrollForce
        const baseYVel = velocities[i * 3 + 1] * scrollMultiplier
        const baseZVel = velocities[i * 3 + 2]
        
        // Apply enhanced physics with scroll influence
        positions[i * 3] += baseXVel * delta * 60
        positions[i * 3 + 1] -= baseYVel * delta * 60
        positions[i * 3 + 2] += baseZVel * delta * 60
        
        // Advanced scroll-based turbulence with multiple waves
        const time = state.clock.elapsedTime + scrollVelocity * 0.01
        const turbulence1 = Math.sin(time + i * 0.1) * turbulenceIntensity * 100
        const turbulence2 = Math.cos(time * 1.5 + i * 0.15) * turbulenceIntensity * 80
        const turbulence3 = Math.sin(time * 2 + i * 0.2) * turbulenceIntensity * 60
        
        positions[i * 3] += turbulence1 * delta * 60
        positions[i * 3 + 2] += turbulence2 * delta * 60
        positions[i * 3 + 1] += turbulence3 * 0.3 * delta * 60
        
        // Scroll-based vortex effect for dramatic movement
        if (Math.abs(scrollVelocity) > 200) {
          const vortexRadius = 5 + Math.abs(scrollVelocity) * 0.01
          const angle = time * 0.5 + i * 0.1
          const vortexX = Math.cos(angle) * vortexRadius * 0.01
          const vortexZ = Math.sin(angle) * vortexRadius * 0.01
          
          positions[i * 3] += vortexX * delta * 60
          positions[i * 3 + 2] += vortexZ * delta * 60
        }
        
        // Scroll-influenced particle attraction/repulsion
        const centerX = 0
        const centerZ = 0
        const distanceToCenter = Math.sqrt(
          (positions[i * 3] - centerX) ** 2 + 
          (positions[i * 3 + 2] - centerZ) ** 2
        )
        
        if (Math.abs(scrollVelocity) > 100) {
          const attractionForce = scrollVelocity > 0 ? -0.01 : 0.01
          const forceX = (positions[i * 3] - centerX) / distanceToCenter * attractionForce
          const forceZ = (positions[i * 3 + 2] - centerZ) / distanceToCenter * attractionForce
          
          positions[i * 3] += forceX * Math.abs(scrollVelocity) * 0.001 * delta * 60
          positions[i * 3 + 2] += forceZ * Math.abs(scrollVelocity) * 0.001 * delta * 60
        }
        
        // Reset particle with scroll-influenced spawn
        if (positions[i * 3 + 1] < -15) {
          positions[i * 3] = (Math.random() - 0.5) * 25
          positions[i * 3 + 1] = 15 + Math.random() * 5
          positions[i * 3 + 2] = (Math.random() - 0.5) * 25
        }
        
        // Dynamic boundary wrapping based on scroll intensity
        const boundarySize = 12.5 + Math.abs(scrollVelocity) * 0.01
        if (positions[i * 3] > boundarySize) positions[i * 3] = -boundarySize
        if (positions[i * 3] < -boundarySize) positions[i * 3] = boundarySize
        if (positions[i * 3 + 2] > boundarySize) positions[i * 3 + 2] = -boundarySize
        if (positions[i * 3 + 2] < -boundarySize) positions[i * 3 + 2] = boundarySize
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true
    }
  })

  // Dynamic material properties based on scroll
  const particleSize = 0.03 + Math.abs(scrollVelocity) * 0.0005
  const particleOpacity = Math.min(0.7 + Math.abs(scrollVelocity) * 0.002, 1.0)

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particleSize}
        color="#61DAFB"
        transparent
        opacity={particleOpacity}
        sizeAttenuation
      />
    </points>
  )
}

// Hook to track scroll velocity
function useScrollVelocity() {
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const lastTime = useRef(Date.now())

  const handleScroll = useCallback(() => {
    const currentTime = Date.now()
    const currentScrollY = window.scrollY
    const deltaTime = currentTime - lastTime.current
    const deltaY = currentScrollY - lastScrollY.current

    if (deltaTime > 0) {
      const velocity = deltaY / deltaTime * 1000 // pixels per second
      setScrollVelocity(velocity)
    }

    lastScrollY.current = currentScrollY
    lastTime.current = currentTime
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Decay velocity when not scrolling
    const decay = setInterval(() => {
      setScrollVelocity(prev => prev * 0.95)
    }, 16)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(decay)
    }
  }, [handleScroll])

  return scrollVelocity
}

// Main Rain Effect Component with Scroll Features
interface RainEffectProps {
  type?: 'classic' | 'matrix' | 'particle' | 'neon'
  intensity?: 'light' | 'medium' | 'heavy'
  className?: string
}

export function RainEffect({ 
  type = 'classic', 
  intensity = 'medium',
  className = "" 
}: RainEffectProps) {
  const scrollVelocity = useScrollVelocity()
  
  const counts = {
    light: { classic: 1000, matrix: 300, particle: 800, neon: 500 },
    medium: { classic: 2000, matrix: 600, particle: 1500, neon: 1000 },
    heavy: { classic: 3000, matrix: 1000, particle: 2500, neon: 1500 }
  }

  const count = counts[intensity][type]

  const renderRain = () => {
    switch (type) {
      case 'matrix':
        return <MatrixRain count={count} scrollVelocity={scrollVelocity} />
      case 'particle':
        return <ParticleRain count={count} scrollVelocity={scrollVelocity} />
      case 'neon':
        return <NeonRain count={count} scrollVelocity={scrollVelocity} />
      default:
        return <RainDrops count={count} scrollVelocity={scrollVelocity} />
    }
  }

  // Dynamic lighting based on scroll
  const ambientIntensity = type === 'neon' 
    ? 0.1 + Math.abs(scrollVelocity) * 0.0005
    : 0.3 + Math.abs(scrollVelocity) * 0.0003

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ height: '100%', width: '100%' }}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={Math.min(ambientIntensity, 1.0)} />
        {renderRain()}
        <AirplaneFleet scrollVelocity={scrollVelocity} />
      </Canvas>
      <AudioController 
        rainType={type} 
        intensity={intensity} 
        scrollVelocity={scrollVelocity} 
      />
    </div>
  )
}

// Enhanced Rain Controller with Scroll Features
export function RainController() {
  const [rainType, setRainType] = useState<'classic' | 'matrix' | 'particle' | 'neon'>('classic')
  const [intensity, setIntensity] = useState<'light' | 'medium' | 'heavy'>('medium')
  const [isVisible, setIsVisible] = useState(true)
  const scrollVelocity = useScrollVelocity()

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-2 text-white hover:bg-black/90 transition-colors"
        style={{ 
          boxShadow: Math.abs(scrollVelocity) > 50 
            ? `0 0 ${Math.min(Math.abs(scrollVelocity) * 0.1, 20)}px rgba(79, 195, 247, 0.5)` 
            : 'none' 
        }}
      >
        🌧️
      </button>
    )
  }

  const scrollIntensity = Math.min(Math.abs(scrollVelocity) / 100, 1)
  const scrollDirection = scrollVelocity > 0 ? '↓' : scrollVelocity < 0 ? '↑' : '•'

  return (
    <div 
      className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white min-w-[220px] transition-all duration-200"
      style={{ 
        borderColor: `rgba(79, 195, 247, ${scrollIntensity})`,
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: scrollIntensity > 0.1 
          ? `0 0 ${scrollIntensity * 15}px rgba(79, 195, 247, ${scrollIntensity * 0.5})` 
          : 'none' 
      }}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold">Rain Effects</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white text-xs"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-300 block mb-1">Type</label>
          <select 
            value={rainType} 
            onChange={(e) => setRainType(e.target.value as any)}
            className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-white"
          >
            <option value="classic">Classic Rain</option>
            <option value="matrix">Matrix Digital</option>
            <option value="particle">Particle Physics</option>
            <option value="neon">Neon Glow</option>
          </select>
        </div>
        
        <div>
          <label className="text-xs text-gray-300 block mb-1">Intensity</label>
          <select 
            value={intensity} 
            onChange={(e) => setIntensity(e.target.value as any)}
            className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-white"
          >
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>
        
        {/* Scroll Velocity Indicator */}
        <div className="bg-gray-800/50 rounded p-2 border border-gray-700">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-300">Scroll Effect</span>
            <span className="text-xs text-cyan-400">{scrollDirection}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-200"
                style={{ width: `${Math.min(scrollIntensity * 100, 100)}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 min-w-[40px]">
              {Math.round(Math.abs(scrollVelocity))}
            </span>
          </div>
        </div>
        
        <div className="text-xs text-gray-400 mt-2 space-y-1">
          <div>Current: {rainType} ({intensity})</div>
          <div className="text-cyan-400">💡 Scroll to enhance effects!</div>
          <div className="text-yellow-400">✈️ Airplanes fly through the rain!</div>
        </div>
      </div>
    </div>
  )
}

export default RainEffect
