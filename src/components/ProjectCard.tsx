'use client'

import { ExternalLink, FileText } from 'lucide-react'

interface Project {
  id: number
  title: string
  summary: string
  tags: string[]
  link: string
  type: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card group">
      {/* Project Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {project.summary}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex justify-between items-center">
        <a
          href={project.link}
          className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
        >
          {project.link === '#' ? (
            <>
              <FileText className="w-4 h-4" />
              Read case study
            </>
          ) : (
            <>
              <ExternalLink className="w-4 h-4" />
              View project
            </>
          )}
        </a>
        
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-200">
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors duration-200" />
        </div>
      </div>
    </div>
  )
}
