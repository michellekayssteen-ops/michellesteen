'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ExternalLink, Users, Calendar, MapPin, CheckCircle, BarChart3, Smartphone, Accessibility } from 'lucide-react'
import BubbleBackground from './BubbleBackground'

export default function MapitProject() {
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

  // Set up intersection observers for each section
  useEffect(() => {
    const sections = [
      'overview',
      'my-contribution',
      'process',
      'user-research',
      'prototype',
      'usability-testing',
      'final-design',
      'outcome'
    ]

    const observers = sections.map(sectionId => {
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

  const handleBack = () => {
    window.history.back()
  }

  return (
    <BubbleBackground className="min-h-screen" style={{ backgroundColor: '#9bd5eb' }}>
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Work
              </button>
              <div className="flex items-center gap-6">
                <a href="#home" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">Home</a>
                <a href="#work" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">Work</a>
                <a href="#about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">About</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">Resume</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="pt-20 pb-8">
          <div className="max-w-6xl mx-auto px-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
              <a href="#home" className="hover:text-gray-900 transition-colors duration-200">Home</a>
              <span>→</span>
              <a href="#work" className="hover:text-gray-900 transition-colors duration-200">Work</a>
              <span>→</span>
              <span className="text-gray-900 font-medium">Mapit</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-8 pb-16">
          {/* Header */}
          <div ref={sectionRef} className={`mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Mapit</h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              A navigation app designed for University of Waterloo students to optimize campus travel efficiency and accessibility.
            </p>
            
            {/* Cover Image */}
            <div className="mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
                <div className="flex justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop&crop=center" 
                    alt="Mapit app screenshots showing splash screen, onboarding, and AR navigation interface"
                    className="max-w-full h-auto rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
            
            {/* Project Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  The Team
                </h3>
                <p className="text-gray-600 text-sm">1 × Product Manager<br/>1 × Product Designer<br/>1 × Product Developer</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Year
                </h3>
                <p className="text-gray-600 text-sm">2023</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </h3>
                <p className="text-gray-600 text-sm">University of Waterloo</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <section id="overview" className={`mb-16 transition-all duration-1000 ${
            visibleSections.has('overview') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                The University of Waterloo houses 42,000+ students over the academic year on one compact campus. 
                The University of Waterloo has 4.3 million assignable square feet of building space. Within that space, 
                there are 237 classrooms with 250,347 assignable square feet.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                As students and faculty with tight schedules and big dreams to chase, poor route planning can negatively 
                impact efficiency. Wouldn't everyone like to snooze their alarm once more every morning knowing you can 
                commute to class in an optimized time frame?
              </p>
              <p className="text-gray-700 leading-relaxed">
                MapIt is a navigation app aimed to be used in university campus settings, specifically designed for 
                implementation at the University of Waterloo. MapIt shows students the most efficient path to take between 
                any two points on campus, addressing the issue of accessibility and wastage of time spent traveling.
              </p>
            </div>
          </section>

          {/* My Contribution */}
          <section id="my-contribution" className={`mb-16 transition-all duration-1000 delay-200 ${
            visibleSections.has('my-contribution') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">My Contribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center">
                <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Product Strategy</h3>
                <p className="text-gray-600 text-sm">Led strategic planning and decision matrix analysis</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">User Research</h3>
                <p className="text-gray-600 text-sm">Conducted surveys and usability testing with 100+ students</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center">
                <Smartphone className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Product Design</h3>
                <p className="text-gray-600 text-sm">Designed user flows and accessibility features</p>
              </div>
            </div>
          </section>

          {/* Process */}
          <section id="process" className={`mb-16 transition-all duration-1000 delay-300 ${
            visibleSections.has('process') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Process</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Decision Matrix</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                We wanted to design something that the university could actually implement and as a result, 
                we weighted feasibility the highest. Since we were told that we had an endless amount of funding 
                for the project, we weighted affordability the lowest. Since campus as well as the number of students 
                on campus change quite often from term to term, we weighted scalability quite high.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Criteria</th>
                      <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Weight</th>
                      <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Navigation App</th>
                      <th className="border border-gray-300 px-4 py-2 text-center font-semibold">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Feasibility</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">5</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">5</td>
                      <td className="border border-gray-300 px-4 py-2 text-center font-semibold">25</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Scalability</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">4</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">5</td>
                      <td className="border border-gray-300 px-4 py-2 text-center font-semibold">20</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Time Saved</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">5</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">4</td>
                      <td className="border border-gray-300 px-4 py-2 text-center font-semibold">20</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Affordability</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">5</td>
                      <td className="border border-gray-300 px-4 py-2 text-center font-semibold">10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 leading-relaxed mt-6">
                Based on this collective weighted criteria, we found that a navigation application was the best 
                possible solution to our problem of whether students travel around campus efficiently.
              </p>
            </div>
          </section>

          {/* User Research */}
          <section id="user-research" className={`mb-16 transition-all duration-1000 delay-400 ${
            visibleSections.has('user-research') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">User Research</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Time Wasted on Campus</h3>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-blue-600 mb-2">94.1%</div>
                  <p className="text-gray-600">of students waste at least 1-5 minutes while traveling on campus</p>
                </div>
                <p className="text-gray-700 text-sm">
                  This means most students waste at least a little bit of time getting to a building or class. 
                  Those 5 minutes could make or break a student's ability to take a test or an exam.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Route Awareness</h3>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-green-600 mb-2">94%</div>
                  <p className="text-gray-600">believe there are better routes they're unaware of</p>
                </div>
                <p className="text-gray-700 text-sm">
                  This demonstrates that something needs to be implemented to teach students of these routes 
                  so they can be appropriately utilized.
                </p>
              </div>
            </div>
          </section>

          {/* Prototype */}
          <section id="prototype" className={`mb-16 transition-all duration-1000 delay-500 ${
            visibleSections.has('prototype') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Prototype Overview</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                MapIt shows students the most efficient path to take between any two points on campus. 
                It addresses the issue of accessibility and wastage of time spent traveling. More features, 
                including but not limited to displaying events, storing schedules, and AR navigation enhance the user experience.
              </p>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-600 italic">Prototype screenshots would be displayed here</p>
                <p className="text-sm text-gray-500 mt-2">Four chronological screens from the onboarding process</p>
              </div>
            </div>
          </section>

          {/* Usability Testing */}
          <section id="usability-testing" className={`mb-16 transition-all duration-1000 delay-600 ${
            visibleSections.has('usability-testing') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Usability Testing</h2>
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">First Iteration - Low Fidelity</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our first usability testing was conducted using the pen and paper method digitally to accommodate 
                  remote interviews. Main feedback received included points on minimalism (60% of test subjects) 
                  and intuitiveness (56% of test subjects).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">60%</div>
                    <p className="text-sm text-gray-600">Emphasized minimalism</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">56%</div>
                    <p className="text-sm text-gray-600">Valued intuitiveness</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Second Iteration - Medium Fidelity</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We conducted a focus group to have a deeper discussion on accessibility. Participants spoke about 
                  needs not commonly displayed on navigation apps, such as shortest routes for wheelchair users 
                  and verbal commands for visually challenged users.
                </p>
                <div className="flex items-center gap-2 text-green-600">
                  <Accessibility className="w-5 h-5" />
                  <span className="font-medium">Accessibility features added</span>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Third Iteration - High Fidelity</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We observed students as they navigated through the app to complete given tasks and timed their workflows. 
                  We took all feedback to further refine the prototype.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">90%</div>
                    <p className="text-sm text-gray-600">Satisfied with accessibility features</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">87%</div>
                    <p className="text-sm text-gray-600">Found app intuitive to navigate</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final Design */}
          <section id="final-design" className={`mb-16 transition-all duration-1000 delay-700 ${
            visibleSections.has('final-design') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Final Design</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                Using the data collected from conducting usability testing, we designed our user flow, 
                included our user personas and collected our lo-fi and hi-fi designs.
              </p>
              <div className="bg-gray-100 rounded-lg p-8 text-center mb-6">
                <p className="text-gray-600 italic">Final prototype screenshots would be displayed here</p>
                <a 
                  href="https://www.figma.com/file/PhKNzE0LQjBB0RVJgTwZwb/162-Final-Navigation-Prototype?node-id=0%3A1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Figma Prototype
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Design System</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    We designed Mapit with Google's Material Design system in mind, and ensured our app was up to WCAG colour standards.
                  </p>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">WCAG compliant</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Privacy & Open Source</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    The app will be free to use and not for profit, with aggregated data stored on a decentralized server with noise injection.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Open source & transparent</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Outcome */}
          <section id="outcome" className={`mb-16 transition-all duration-1000 delay-800 ${
            visibleSections.has('outcome') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Outcome</h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                MapIt will be an asset to any student on campus through its commitment to increasing travel accessibility 
                and saving students time. It can serve as a replacement for the largely unadopted current Portal app's map feature.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Key Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Optimized navigation routes indoors and outdoors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Free to download with open-source code</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Scalable to add more features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">Comprehensive accessibility features</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Next Steps</h3>
                  <p className="text-gray-700 text-sm">
                    Mapit is scalable and flexible to encourage the addition of new features. Students can voice opinions on the app, 
                    and it can change easily if building expansions are introduced or new classes are built.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Next Project */}
          <div className="text-center">
            <a 
              href="#work" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Next Project: Got2Go
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </BubbleBackground>
  )
}
