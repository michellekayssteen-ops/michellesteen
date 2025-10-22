'use client'

import { TrendingUp, Map, Users, Lightbulb } from 'lucide-react'

export default function WorkingOn() {
  const currentWork = [
    {
      id: 1,
      title: 'A/B Testing "Looks Pack" Feature',
      description: 'Iterating on feature variations to optimize user engagement and conversion rates.',
      icon: TrendingUp,
      status: 'In Progress',
      progress: 75
    },
    {
      id: 2,
      title: 'Trip Planning Workflow Experiments',
      description: 'Exploring routing algorithms, constraint handling, and heuristic optimization for travel planning.',
      icon: Map,
      status: 'Research Phase',
      progress: 40
    },
    {
      id: 3,
      title: 'Lightweight Usability Study Templates',
      description: 'Creating streamlined research frameworks to accelerate user testing cycles and insights gathering.',
      icon: Users,
      status: 'Design Phase',
      progress: 60
    }
  ]

  return (
    <section className="section-padding">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="headline mb-6">
            Working On
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Current projects and experiments I'm exploring to push the boundaries of product development.
          </p>
        </div>

        {/* Work Items */}
        <div className="space-y-8">
          {currentWork.map((work) => {
            const IconComponent = work.icon
            return (
              <div key={work.id} className="card">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {work.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {work.description}
                    </p>
                  </div>
                </div>

                {/* Status and Progress */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    {work.status}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${work.progress}%` }}
                      />
                    </div>
                    <span className="metadata">{work.progress}%</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">
            Always exploring new challenges and opportunities
          </p>
          <a
            href="mailto:hello@michellesteen.net"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
          >
            <Lightbulb className="w-4 h-4" />
            Let's collaborate on something interesting
          </a>
        </div>
      </div>
    </section>
  )
}
