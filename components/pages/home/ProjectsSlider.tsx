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

export function ProjectsSlider({ projects }: ProjectsSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

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
      ref={scrollRef}
      className="-mx-4 snap-x snap-mandatory overflow-x-auto px-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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
  )
}
