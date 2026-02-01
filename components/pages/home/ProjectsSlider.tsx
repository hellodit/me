'use client'

import { ProjectCard } from '@/components/ProjectCard'
import { useEffect, useRef, useState } from 'react'
import type { ProjectFrontmatter } from '@/utils/mdx'

interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
}

interface ProjectsSliderProps {
  projects: Array<Project | null>
}

const CARD_WIDTH = 320
const GAP = 12
const SCROLL_INTERVAL = 4000

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export function ProjectsSlider({ projects }: ProjectsSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const scrollBy = (direction: 'prev' | 'next') => {
    const container = scrollRef.current
    if (!container) return

    const firstItem = container.querySelector('li')
    const scrollAmount = firstItem ? firstItem.getBoundingClientRect().width + GAP : CARD_WIDTH + GAP
    const maxScroll = container.scrollWidth - container.clientWidth

    const next =
      direction === 'prev'
        ? container.scrollLeft <= 1
          ? maxScroll
          : container.scrollLeft - scrollAmount
        : container.scrollLeft >= maxScroll - 1
          ? 0
          : container.scrollLeft + scrollAmount

    container.scrollTo({ left: next, behavior: 'smooth' })
  }

  useEffect(() => {
    const container = scrollRef.current
    const validProjects = projects.filter(Boolean)
    if (!container || validProjects.length <= 1 || isPaused) return

    const scroll = () => {
      const firstItem = container.querySelector('li')
      const scrollAmount = firstItem ? firstItem.getBoundingClientRect().width + GAP : CARD_WIDTH + GAP
      const maxScroll = container.scrollWidth - container.clientWidth
      const next = container.scrollLeft + scrollAmount

      container.scrollTo({
        left: next >= maxScroll - 1 ? 0 : next,
        behavior: 'smooth',
      })
    }

    const id = setInterval(scroll, SCROLL_INTERVAL)
    return () => clearInterval(id)
  }, [projects, isPaused])

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        type="button"
        onClick={() => scrollBy('prev')}
        aria-label="Previous project"
        className="absolute left-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-layout-primary bg-layout-secondary-active text-zinc-600 shadow-sm outline-none transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollBy('next')}
        aria-label="Next project"
        className="absolute right-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-layout-primary bg-layout-secondary-active text-zinc-600 shadow-sm outline-none transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400"
      >
        <ChevronRight className="size-5" />
      </button>
      <div
        ref={scrollRef}
        className="-mx-4 snap-x snap-mandatory overflow-x-auto px-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex gap-3 py-1">
        {projects.map((project) => {
          if (!project) return null
          return (
            <li key={project.slug} className="shrink-0 snap-start">
              <div className="flex h-[170px] w-[min(85vw,320px)] min-w-[280px]">
                <ProjectCard
                  className="h-full w-full overflow-hidden"
                  title={project.frontmatter.title}
                  description={project.frontmatter.description}
                  slug={project.slug}
                  icon={project.frontmatter.icon}
                  tags={project.frontmatter.tags}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
    </div>
  )
}
