'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import Hero from '@/components/Hero'
import Work from '@/components/Work'
import About from '@/components/About'
import MapitProject from '@/components/MapitProject'
import GooeyBackground from '@/components/GooeyBackground'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [currentPage, setCurrentPage] = useState('home')
  const { isAnimating } = useScrollAnimation()

  useEffect(() => {
    // Check for project page in URL hash
    const hash = window.location.hash
    if (hash === '#mapit') {
      setCurrentPage('mapit')
    } else {
      setCurrentPage('home')
    }

    const handleScroll = () => {
      const sections = ['home', 'work', 'about']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#mapit') {
        setCurrentPage('mapit')
      } else {
        setCurrentPage('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Show project page if in URL
  if (currentPage === 'mapit') {
    return <MapitProject />
  }

  return (
    <div className="relative">
      <GooeyBackground isAnimating={isAnimating} />
      <div className="flex min-h-screen">
        <Sidebar activeSection={activeSection} />
        
        <main className="main-content flex-1">
          <section id="home" className="relative min-h-screen flex items-center">
            <Hero />
          </section>
          
          <section id="work" className="relative">
            <Work />
          </section>
          
          <section id="about" className="relative">
            <About />
          </section>
        </main>
      </div>
    </div>
  )
}