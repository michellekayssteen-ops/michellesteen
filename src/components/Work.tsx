'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function Work() {
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

  // Set up intersection observers for each work section
  useEffect(() => {
    const subSections = ['currently', 'previously']

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

  const currentWork = [
    {
      text: 'Leading the creation of an AI-driven companion for seniors, merging computer vision hazard detection with a Gemini-powered conversational system to enhance safety, autonomy, and emotional well-being with ',
      linkText: 'Wat.ai',
      link: 'https://watai.ca/'
    },
    {
      text: 'Designing an augmented reality learning tool that transforms how medical professionals practice suturing by combining real-time visual feedback with tactile precision.'
    },
    {
      text: 'Driving large-scale AI initiatives at ',
      linkText: 'TikTok',
      link: 'https://www.tiktok.com/en/',
      textAfter: ', collaborating with cross-functional teams to elevate content safety, improve policy transparency, and strengthen trust between creators and the platform.'
    }
  ]

  const previousWork = [
    {
      text: 'Shaped the future of generative AI tools at ',
      linkText: 'HeyGen',
      link: 'https://app.heygen.com/home',
      textAfter: ', launching creative experiences that empowered users to design and personalize avatars, voices, and digital identities.'
    },
    {
      text: 'Advanced biomedical innovation at ',
      linkText: 'MolecuLight',
      link: 'http://moleculight.com/',
      textAfter: ' by defining product features and developing imaging capabilities that bridged engineering precision with clinical usability.'
    },
    {
      text: 'Strengthened neuroscience technology at ',
      linkText: 'Omniscient Neurotechnology',
      link: 'https://www.o8t.com/',
      textAfter: ', optimizing system validation processes and improving the reliability of complex data pipelines.'
    },
    {
      text: 'Engineered data visibility and risk management frameworks at ',
      linkText: 'AceAge',
      link: 'https://www.tecsys.com/',
      textAfter: ', developing SQL-based tools, refining medical device requirements, and ensuring safety through rigorous hazard analyses.'
    },
    {
      text: 'Led ',
      linkText: 'UW PM Live Case Studies',
      link: 'https://uwaterloopm.com/',
      textAfter: ', an interactive program that immerses students in real-world product challenges and develops the next generation of product thinkers.'
    },
    {
      text: 'Designed user-centered digital solutions with ',
      linkText: 'Engineers Without Borders',
      link: 'https://uwaterloo.ca/sedra-student-design-centre/directory-teams/engineers-without-borders',
      textAfter: ', applying design thinking to support sustainable development and community empowerment.'
    },
    {
      text: 'Earned second place at ',
      linkText: 'ProdCon 2023',
      link: 'https://uwaterloopm.com/',
      textAfter: ' for ProdFrost, a smart fridge concept that promotes healthy, eco-conscious eating through automated ingredient tracking, recipe intelligence, and food waste prevention.'
    }
  ]

  return (
    <div className="py-24">
      <div ref={sectionRef} className="w-full">
        <div className="max-w-6xl px-8 mx-auto">
          <div className="text-left">
            {/* Work Section */}
            <div className={`mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-4xl font-semibold text-gray-900 mb-6">
                Work
              </h2>
            </div>

            {/* Currently Working On */}
            <div id="currently" className={`mb-16 transition-all duration-1000 delay-200 ${
              visibleSections.has('currently') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Currently
              </h3>
              <ul className="space-y-3">
                {currentWork.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gray-400 mr-3 mt-1 text-xl">•</span>
                    <div>
                      {item.link ? (
                        <>
                          <span className="text-gray-600 leading-relaxed">{item.text}</span>
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200">
                            {item.linkText}
                          </a>
                        </>
                      ) : (
                        <span className="text-gray-600 leading-relaxed">{item.text}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Previously */}
            <div id="previously" className={`transition-all duration-1000 delay-400 ${
              visibleSections.has('previously') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Previously
              </h3>
              <ul className="space-y-3">
                {previousWork.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gray-400 mr-3 mt-1 text-xl">•</span>
                    <div>
                      {item.link ? (
                        <>
                          <span className="text-gray-600 leading-relaxed">{item.text}</span>
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200">
                            {item.linkText}
                          </a>
                          <span className="text-gray-600 leading-relaxed">{item.textAfter}</span>
                        </>
                      ) : (
                        <span className="text-gray-600 leading-relaxed">{item.text}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}