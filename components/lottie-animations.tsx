"use client"

import Lottie from 'lottie-react'
import { useState, useEffect } from 'react'

// You can download Lottie animations from lottiefiles.com
// For now, I'll create a simple animated icon component

export function AnimatedIcon({ 
  animation, 
  className = "w-16 h-16",
  loop = true,
  autoplay = true 
}: {
  animation?: any
  className?: string
  loop?: boolean
  autoplay?: boolean
}) {
  const [animationData, setAnimationData] = useState(null)

  // Simple animated loading placeholder
  const defaultAnimation = {
    "v": "5.7.4",
    "fr": 60,
    "ip": 0,
    "op": 60,
    "w": 100,
    "h": 100,
    "nm": "Simple Circle",
    "ddd": 0,
    "assets": [],
    "layers": [
      {
        "ddd": 0,
        "ind": 1,
        "ty": 4,
        "nm": "Circle",
        "sr": 1,
        "ks": {
          "o": {"a": 0, "k": 100},
          "r": {"a": 1, "k": [
            {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]},
            {"t": 60, "s": [360]}
          ]},
          "p": {"a": 0, "k": [50, 50]},
          "a": {"a": 0, "k": [0, 0]},
          "s": {"a": 0, "k": [100, 100]}
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "d": 1,
                "ty": "el",
                "s": {"a": 0, "k": [40, 40]},
                "p": {"a": 0, "k": [0, 0]}
              },
              {
                "ty": "st",
                "c": {"a": 0, "k": [0.5, 0.3, 1, 1]},
                "o": {"a": 0, "k": 100},
                "w": {"a": 0, "k": 4}
              }
            ]
          }
        ]
      }
    ]
  }

  useEffect(() => {
    setAnimationData(animation || defaultAnimation)
  }, [animation])

  if (!animationData) {
    return <div className={`${className} bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-spin`} />
  }

  return (
    <Lottie
      animationData={animationData}
      className={className}
      loop={loop}
      autoplay={autoplay}
    />
  )
}

export function CodeIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`${className} relative`}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg animate-pulse opacity-20" />
      <div className="relative z-10 w-full h-full flex items-center justify-center text-purple-600">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3/4 h-3/4">
          <path d="M8 3L4 7L8 11" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3L20 7L16 11" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 17L10 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}
