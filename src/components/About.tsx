'use client'

import { useEffect, useRef, useState } from 'react'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)

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

  // Set up intersection observers for each sub-section
  useEffect(() => {
    const subSections = [
      'what-drives-me',
      'builder-at-heart',
      'explorer',
      'and-more'
    ]

    const observers = subSections.map(sectionId => {
      const element = document.getElementById(sectionId)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, sectionId]))
          }
        },
        { threshold: 0.2, rootMargin: '-50px 0px' }
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [])


  return (
    <div className="py-24">
      <div ref={sectionRef} className="w-full">
        <div className="max-w-6xl px-8 mx-auto">
          <div className="text-left">
            {/* About Me Section */}
            <div className={`mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-4xl font-semibold text-gray-900 mb-6">
                About Me
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mb-8">
                Learn more about my journey, passions, and what drives me to build meaningful technology.
              </p>
              
              {/* About Me Content */}
              <div className="space-y-8 text-gray-700">
                <div id="what-drives-me" className={`transition-all duration-1000 ${
                  visibleSections.has('what-drives-me') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    ✨ What drives me
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    My passion lies in creating technology that allows humans to connect in real and meaningful ways. On TikTok, I've seen how short-form video sparks creativity and global community, reshaping how we share stories. At HeyGen, I brought that same spirit into designing avatars and voice tools that feel authentic—bridging cultures, amplifying voices, and expanding how people express themselves. For me, technology is at its best when it doesn't replace humanity, but amplifies it.
                  </p>
                </div>


                <div id="builder-at-heart" className={`transition-all duration-1000 delay-300 ${
                  visibleSections.has('builder-at-heart') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    🎨 A Builder at Heart
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    I love taking messy, complex problems and shaping them into experiences that feel simple and intuitive. At TikTok, I work on challenges at a massive scale, building systems that keep live communities safe while still encouraging authentic expression. At HeyGen, I reimagined how people interact with voice and visuals, whether that meant redesigning a flow so it felt natural or experimenting with creative features that unlocked new forms of expression. For me, the most exciting work happens where usability, data, and imagination meet.
                  </p>
                </div>


                <div id="explorer" className={`transition-all duration-1000 delay-500 ${
                  visibleSections.has('explorer') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    🌍 An Explorer
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    I've traveled across Europe, Asia, and North America, and I'm always seeking new perspectives. Most recently I was on exchange in Madrid and visited places like Marraco, Portugal, Malta, the UK, and more. The more I travel, the more I come to realize there is way more that makes us alike than divides us.
                  </p>
                </div>

                <div id="and-more" className={`transition-all duration-1000 delay-600 ${
                  visibleSections.has('and-more') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    💌 And More!
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    When I'm not working on products, you'll find me:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span>📚</span>
                      <span>Reading philosophy and ethics (especially tech & society)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🏃‍♀️</span>
                      <span>Playing sports like Ultimate frisbee, flag football, and bouldering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>👨‍🍳</span>
                      <span>Cooking and organizing a 12 course meal for 30 of my friends</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}