'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="w-full flex items-center justify-center py-32">
      <div className="w-full grid grid-cols-12 gap-0">
        {/* Spacer for sidebar */}
        <div className="col-span-2"></div>
        
        {/* Main content area */}
        <div className="col-span-8 flex justify-center">
          <div className="max-w-4xl px-8">
            {/* Hero Content */}
            <div className={`text-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h1 className="text-5xl font-semibold text-gray-900 mb-8">
                Hi! I'm{' '}
                <span className="text-gray-900">Michelle Steen</span>
                .
              </h1>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-16">
                I am passionate about using technology and AI to facilitate human connection, creativity, and storytelling.
              </p>
              
              {/* Scroll Down Arrow */}
              <div className={`flex justify-center mb-16 transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <div className="animate-bounce">
                  <ChevronDown className="w-8 h-8 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right spacer */}
        <div className="col-span-2"></div>
      </div>
    </div>
  )
}
