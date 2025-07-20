"use client"

import { useState } from 'react'
import { RainEffect, RainController } from '@/components/rain-effects'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Droplets, Code, Sparkles, Zap, MousePointer, ArrowDown } from 'lucide-react'
import Link from 'next/link'

export default function RainEffectsDemo() {
  const [currentEffect, setCurrentEffect] = useState<'classic' | 'matrix' | 'particle' | 'neon'>('classic')
  const [intensity, setIntensity] = useState<'light' | 'medium' | 'heavy'>('medium')

  const effects = [
    {
      id: 'classic',
      name: 'Classic Rain',
      description: 'Traditional rainfall with scroll-responsive physics',
      icon: <Droplets className="w-5 h-5" />,
      color: 'bg-blue-500',
      scrollFeatures: ['Speed boost on scroll', 'Horizontal drift', 'Dynamic opacity']
    },
    {
      id: 'matrix',
      name: 'Matrix Digital',
      description: 'Green digital code rain with scroll-enhanced flickering',
      icon: <Code className="w-5 h-5" />,
      color: 'bg-green-500',
      scrollFeatures: ['Enhanced flickering', 'Scroll-speed multiplier', 'Horizontal movement']
    },
    {
      id: 'particle',
      name: 'Particle Physics',
      description: 'Advanced particle system with scroll-based turbulence',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'bg-cyan-500',
      scrollFeatures: ['Physics turbulence', 'Scroll force application', 'Dynamic boundaries']
    },
    {
      id: 'neon',
      name: 'Neon Glow',
      description: 'Colorful neon particles with scroll-enhanced glow effects',
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-purple-500',
      scrollFeatures: ['Enhanced glow', 'Swirl effects', 'Color intensity boost']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-auto">
      {/* Current Rain Effect */}
      <RainEffect type={currentEffect} intensity={intensity} />
      
      {/* Enhanced Rain Controller */}
      <RainController />
      
      {/* Navigation */}
      <nav className="relative z-40 p-6">
        <Link href="/">
          <Button variant="ghost" className="text-white hover:text-cyan-400">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </Link>
      </nav>

      {/* Main Content with Lots of Scrollable Content */}
      <div className="relative z-30 container mx-auto px-6 py-12 space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Scroll-Responsive Rain Effects
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Experience interactive rain effects that respond to your scrolling behavior
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/20 rounded-full border border-cyan-400/30">
            <MousePointer className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm">
              Scroll this page to see the magic happen!
            </span>
          </div>
        </div>

        {/* Scroll Instruction */}
        <Card className="bg-black/40 backdrop-blur-sm border-gray-700 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ArrowDown className="w-5 h-5 text-cyan-400" />
              How Scroll Interaction Works
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-3">
            <p>The rain effects respond dynamically to your scrolling:</p>
            <ul className="space-y-2 list-disc list-inside ml-4">
              <li><strong>Scroll Speed:</strong> Faster scrolling increases rain intensity and speed</li>
              <li><strong>Direction:</strong> Scroll direction affects particle movement and drift</li>
              <li><strong>Visual Effects:</strong> Enhanced glow, flickering, and turbulence</li>
              <li><strong>Physics:</strong> Real-time particle physics respond to scroll velocity</li>
            </ul>
          </CardContent>
        </Card>

        {/* Effect Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Effect Type Selector */}
          <Card className="bg-black/40 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Rain Type
              </CardTitle>
              <CardDescription className="text-gray-300">
                Choose your preferred rain animation style
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {effects.map((effect) => (
                <div
                  key={effect.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                    currentEffect === effect.id
                      ? 'border-cyan-400 bg-cyan-400/10'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                  }`}
                  onClick={() => setCurrentEffect(effect.id as any)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${effect.color} text-white`}>
                      {effect.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{effect.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{effect.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {effect.scrollFeatures.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {currentEffect === effect.id && (
                      <Badge className="bg-cyan-400 text-black">Active</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Intensity Controller */}
          <Card className="bg-black/40 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Intensity & Scroll Features
              </CardTitle>
              <CardDescription className="text-gray-300">
                Adjust base intensity - scroll effects multiply this
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['light', 'medium', 'heavy'].map((level) => (
                <Button
                  key={level}
                  variant={intensity === level ? "default" : "outline"}
                  className={`w-full justify-start ${
                    intensity === level
                      ? 'bg-cyan-400 text-black hover:bg-cyan-300'
                      : 'border-gray-600 text-white hover:bg-gray-800'
                  }`}
                  onClick={() => setIntensity(level as any)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      level === 'light' ? 'bg-green-400' :
                      level === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
                    }`} />
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </div>
                </Button>
              ))}
              
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Scroll Features</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Real-time velocity tracking</li>
                  <li>• Dynamic particle physics</li>
                  <li>• Adaptive visual effects</li>
                  <li>• Smooth decay when stopping</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add more content to make scrolling meaningful */}
        <div className="space-y-8">
          {Array.from({ length: 5 }, (_, i) => (
            <Card key={i} className="bg-black/40 backdrop-blur-sm border-gray-700 max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-white">Scroll Section {i + 1}</CardTitle>
                <CardDescription className="text-gray-300">
                  Keep scrolling to see how the rain effects respond to your movement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-gray-300 space-y-4">
                  <p>
                    This section provides content to scroll through. Notice how the rain effects 
                    in the background respond to your scrolling speed and direction. The faster 
                    you scroll, the more dramatic the effects become.
                  </p>
                  <p>
                    Each rain type has unique scroll-responsive behaviors:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Classic rain speeds up and drifts horizontally</li>
                    <li>Matrix rain flickers more intensely and moves laterally</li>
                    <li>Particle rain develops turbulence and enhanced physics</li>
                    <li>Neon rain glows brighter and creates swirl patterns</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Final section */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Scroll Back Up!
          </h2>
          <p className="text-gray-300 mb-6">
            Try scrolling in different directions and speeds to see all the effects
          </p>
          <Link href="/">
            <Button className="bg-cyan-400 text-black hover:bg-cyan-300">
              Return to Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
