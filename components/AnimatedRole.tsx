'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/utils/css'

const defaultRoles = ['Software Engineer', 'Tech Lead', 'Content Creator']

interface AnimatedRoleProps {
  roles?: string[]
}

export function AnimatedRole({ roles = defaultRoles }: AnimatedRoleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [roles.length])

  return (
    <span className="relative inline-block align-top">
      <span className="relative inline-block">
        {roles.map((role, index) => {
          const isActive = index === currentIndex
          const offset = index - currentIndex
          const normalizedOffset = offset > 1 ? offset - roles.length : offset < -1 ? offset + roles.length : offset

          return (
            <span
              key={`${role}-${index}`}
              className={cn(
                'absolute left-0 transition-all duration-500 ease-in-out whitespace-nowrap',
                isActive
                  ? 'opacity-100 translate-y-0'
                  : normalizedOffset > 0
                    ? 'opacity-0 translate-y-full'
                    : 'opacity-0 -translate-y-full'
              )}
            >
              <span className="border-b-[0.09375rem] border-current text-accent">{role}</span>
            </span>
          )
        })}
        {/* Invisible placeholder to maintain height */}
        <span className="invisible border-b-[0.09375rem] border-current whitespace-nowrap">
          {roles[currentIndex]}
        </span>
      </span>
    </span>
  )
}
