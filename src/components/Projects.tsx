'use client'

import ProjectCard from './ProjectCard'

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'HeyGen Mobile PRD',
      summary: 'Defined scope & flows for a mobile app; prioritized by customer impact and mobile viability; collaborated with design & eng.',
      tags: ['Product', 'Prototyping', 'Research'],
      link: '#',
      type: 'Product'
    },
    {
      id: 2,
      title: 'API Learning Tool',
      summary: 'Postman-based hands-on teaching tool that lets devs make real API calls; cut onboarding time ~50%.',
      tags: ['Engineering', 'Product', 'Education'],
      link: '#',
      type: 'Engineering'
    },
    {
      id: 3,
      title: 'Voice Creation Flow Redesign',
      summary: 'Improved voice/emotion quality via new creation flow; ran interviews and shipped redesign.',
      tags: ['Product', 'Research', 'UX'],
      link: '#',
      type: 'Product'
    },
    {
      id: 4,
      title: 'Healthcare Analytics Dashboard',
      summary: 'Built real-time monitoring system for patient data; integrated with existing hospital infrastructure.',
      tags: ['Engineering', 'Healthcare', 'Data'],
      link: '#',
      type: 'Engineering'
    },
    {
      id: 5,
      title: 'User Research Framework',
      summary: 'Developed systematic approach to customer interviews; standardized process across 3 product teams.',
      tags: ['Research', 'Process', 'Product'],
      link: '#',
      type: 'Research'
    },
    {
      id: 6,
      title: 'Supply Chain Optimization',
      summary: 'Designed algorithm for route optimization; reduced delivery time by 23% in pilot program.',
      tags: ['Engineering', 'Optimization', 'Logistics'],
      link: '#',
      type: 'Engineering'
    }
  ]

  return (
    <section className="section-padding">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-left mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            A collection of work that showcases my approach to product development, research, and engineering.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
