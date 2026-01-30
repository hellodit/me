'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/css'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: 'Articles' },
  { href: '/projects', label: 'Projects' },
  { href: '/consultation', label: 'Consultation' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-6">
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
  )
}
