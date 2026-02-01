'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@/utils/css'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/service', label: 'Service' },
  { href: '/articles', label: 'Articles' },
  { href: '/projects', label: 'Projects' },
  { href: '/consultation', label: 'Consultation' },
]

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isOpen ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Desktop Menu */}
      <nav className="hidden sm:flex items-center gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative text-sm font-medium transition-colors',
                isActive ? 'text-primary' : 'text-tertiary hover:text-secondary'
              )}
            >
              {item.label}
              {isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        className="sm:hidden flex items-center justify-center p-1 text-primary hover:text-secondary transition-colors"
      >
        <HamburgerIcon isOpen={isOpen} />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40 sm:hidden"
            onClick={() => setIsOpen(false)}
          />
          {/* Menu */}
          <nav className="fixed top-16 left-0 right-0 bg-layout-secondary-active border-b border-layout-primary z-50 sm:hidden">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'text-primary bg-layout-secondary-contrast'
                        : 'text-tertiary hover:text-secondary hover:bg-layout-secondary-contrast'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        </>
      )}
    </>
  )
}
