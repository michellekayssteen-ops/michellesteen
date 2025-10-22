'use client'

import { useEffect, useRef } from 'react'

interface BubbleBackgroundProps {
  children?: React.ReactNode
  className?: string
}

export default function BubbleBackground({ children, className = '' }: BubbleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Interactive circle element
    const interactiveCircle = container.querySelector('.bubble-interactive') as HTMLElement
    if (!interactiveCircle) return

    // Mouse tracking variables
    let mouseX = 0
    let mouseY = 0
    let circleX = 0
    let circleY = 0
    let animationId: number | null = null

    // Configuration
    const config = {
      easingStrength: 0.1,
      maxDistance: 150,
      enableSmoothing: true,
      smoothingFactor: 0.8
    }

    // Mouse move event handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    // Animation loop
    const animate = () => {
      const rect = container.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      // Calculate target position (center + mouse offset)
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
        const smoothedTargetX = circleX + (targetX - circleX) * config.smoothingFactor
        const smoothedTargetY = circleY + (targetY - circleY) * config.smoothingFactor
        
        circleX += (smoothedTargetX - circleX) * config.easingStrength
        circleY += (smoothedTargetY - circleY) * config.easingStrength
      } else {
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
    container.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className={`relative overflow-hidden ${className}`} ref={containerRef}>
      {/* SVG Filter for Gooey Effect */}
      <svg className="absolute top-0 left-0 w-0 h-0 invisible">
        <defs>
          <filter id="bubble-gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
            <feGaussianBlur in="goo" stdDeviation="2" result="final" />
            <feBlend in="SourceGraphic" in2="final" mode="screen" />
          </filter>
        </defs>
      </svg>

      {/* Bubble Container */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="bubble-circles relative w-full h-full" style={{ filter: 'url(#bubble-gooey) blur(15px)' }}>
          {/* Static animated bubbles */}
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
          <div className="bubble bubble-4"></div>
          <div className="bubble bubble-5"></div>
          <div className="bubble bubble-6"></div>
          <div className="bubble bubble-7"></div>
          <div className="bubble bubble-8"></div>
          <div className="bubble bubble-9"></div>
          <div className="bubble bubble-10"></div>
          <div className="bubble bubble-11"></div>
          <div className="bubble bubble-12"></div>
          
          {/* Interactive bubble that follows mouse */}
          <div className="bubble bubble-interactive"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
