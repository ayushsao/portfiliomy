"use client"

import { useEffect, useRef } from "react"

export function useLenis() {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import("@studio-freight/lenis")).default

      const lenis = new Lenis({
        lerp: 0.05,
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 0.5,
        touchMultiplier: 2,
      })

      lenisRef.current = lenis

      let rafId: number

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)

      // Handle anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault()
          const target = document.querySelector(anchor.getAttribute("href")!)
          if (target) {
            lenis.scrollTo(target as HTMLElement, {
              offset: -80,
            })
          }
        })
      })

      return () => {
        if (rafId) {
          cancelAnimationFrame(rafId)
        }
      }
    }

    const cleanup = initLenis()

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
      cleanup?.then(fn => fn?.())
    }
  }, [])

  return lenisRef.current
}
