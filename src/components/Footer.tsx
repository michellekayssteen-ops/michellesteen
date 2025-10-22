'use client'

import { Mail, Linkedin, Github, Globe } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: '#',
      icon: Linkedin
    },
    {
      name: 'GitHub',
      url: '#',
      icon: Github
    },
    {
      name: 'Portfolio',
      url: 'https://michellesteen.netlify.app',
      icon: Globe
    }
  ]

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container-max px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span className="text-2xl font-bold gradient-text">MS</span>
            <p className="text-gray-500 mt-2 text-sm">
              Building thoughtful products, one problem at a time.
            </p>
          </div>

          {/* Email CTA */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Let's work together
            </h3>
            <a
              href="mailto:hello@michellesteen.net"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-2xl transition-all duration-200 hover:shadow-lg"
            >
              <Mail className="w-5 h-5" />
              Get in touch
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Michelle Steen. Built with Next.js, React, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
