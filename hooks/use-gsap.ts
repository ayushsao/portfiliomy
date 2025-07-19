"use client"

import { useEffect, useRef } from "react"

export function useGSAP() {
  const gsapRef = useRef<any>(null)
  const ScrollTriggerRef = useRef<any>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)
      gsapRef.current = gsap
      ScrollTriggerRef.current = ScrollTrigger
    }

    loadGSAP()
  }, [])

  return { gsap: gsapRef.current, ScrollTrigger: ScrollTriggerRef.current }
}
