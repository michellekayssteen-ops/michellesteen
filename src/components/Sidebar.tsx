'use client'

import { useState } from 'react'
import { Mail, Linkedin, Github, Globe, Menu, X } from 'lucide-react'

interface SidebarProps {
  activeSection: string
}

export default function Sidebar({ activeSection }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'work', label: 'Work', href: '#work' },
    { id: 'about', label: 'About', href: '#about' },
  ]

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/michelleksteen/', icon: Linkedin, external: true },
    { name: 'Email', url: 'mailto:hello@michellesteen.net', icon: Mail, external: false },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar hidden lg:block">
        <div className="p-8">
          {/* Navigation */}
          <nav className="mb-12">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`nav-item block w-full text-left ${
                      activeSection === item.id ? 'active' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="border-t border-gray-200 pt-6">
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
                 <div className="flex items-center justify-end px-6 py-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white">
            <nav className="px-6 py-4">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className={`nav-item block w-full text-left ${
                        activeSection === item.id ? 'active' : ''
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Mobile Social Links */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      title={link.name}
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
