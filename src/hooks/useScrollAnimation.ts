'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook to track scroll position and determine when to show/hide bubble animation
 * Animation is only shown when user is in the Home section
 */
export function useScrollAnimation() {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home')
      const workSection = document.getElementById('work')
      
      if (!homeSection || !workSection) return

      const scrollPosition = window.scrollY
      const homeBottom = homeSection.offsetTop + homeSection.offsetHeight
      const workTop = workSection.offsetTop
      
      // Add some buffer zone for smoother transition
      const bufferZone = 150
      
      // Show animation when in home section, hide when approaching work section
      const shouldAnimate = scrollPosition < (workTop - bufferZone)
      
      setIsAnimating(shouldAnimate)
    }

    // Initial check
    handleScroll()

    // Add scroll listener with throttling for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  return { isAnimating }
}
