'use client'

import { useEffect, useRef, useState } from 'react'

interface GooeyBackgroundProps {
  children?: React.ReactNode
  isAnimating?: boolean
}

export default function GooeyBackground({ children, isAnimating = true }: GooeyBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showBubbles, setShowBubbles] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        const scrollPosition = window.scrollY + window.innerHeight / 2
        
        // Hide bubbles when scrolled past the hero section
        setShowBubbles(scrollPosition < heroBottom)
      }
    }

    // Initial check
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Interactive circle element
    const interactiveCircle = container.querySelector('.circle-interactive') as HTMLElement
    if (!interactiveCircle) return

    // Mouse tracking variables
    let mouseX = 0
    let mouseY = 0
    let circleX = 0
    let circleY = 0
    let animationId: number | null = null

    // Configuration (easily customizable)
    const config = {
      easingStrength: 0.1,        // How fast the circle follows the mouse (0.1 = smooth, 0.5 = snappy)
      maxDistance: 200,           // Maximum distance the circle can be from center
      enableSmoothing: true,      // Enable smoothing for very smooth movement
      smoothingFactor: 0.8        // Smoothing factor (0.1 = very smooth, 0.9 = less smooth)
    }

    // Mouse move event handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Animation loop
    const animate = () => {
      // Calculate target position (center + mouse offset)
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      
      // Limit the distance from center
      const deltaX = mouseX - centerX
      const deltaY = mouseY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      
      let targetX = deltaX
      let targetY = deltaY
      
      if (distance > config.maxDistance) {
        const ratio = config.maxDistance / distance
        targetX = deltaX * ratio
        targetY = deltaY * ratio
      }

      // Apply easing
      if (config.enableSmoothing) {
        // Smooth the target position first
        const smoothedTargetX = circleX + (targetX - circleX) * config.smoothingFactor
        const smoothedTargetY = circleY + (targetY - circleY) * config.smoothingFactor
        
        // Then apply easing to the actual position
        circleX += (smoothedTargetX - circleX) * config.easingStrength
        circleY += (smoothedTargetY - circleY) * config.easingStrength
      } else {
        // Direct easing without smoothing
        circleX += (targetX - circleX) * config.easingStrength
        circleY += (targetY - circleY) * config.easingStrength
      }

      // Apply the transform
      interactiveCircle.style.transform = `translate(-50%, -50%) translate(${circleX}px, ${circleY}px)`
      
      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="gooey-background-container" ref={containerRef}>
      {/* SVG Filter for Gooey Effect */}
      <svg className="svg-filters">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
            <feGaussianBlur in="goo" stdDeviation="3" result="final" />
            <feBlend in="SourceGraphic" in2="final" mode="screen" />
          </filter>
        </defs>
      </svg>

      {/* Background Container */}
      <div className="background-container">
        <div className={`gradient-circles ${isAnimating && showBubbles ? 'bubbles-visible' : 'bubbles-hidden'}`}>
          {/* Static animated circles */}
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
          <div className="circle circle-5"></div>
          <div className="circle circle-6"></div>
          
          {/* Interactive circle that follows mouse */}
          <div className="circle circle-interactive"></div>
        </div>
      </div>
    </div>
  )
}
