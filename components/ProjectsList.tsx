'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import { BaseButton } from '@/components/ui/BaseButton'
import type { ProjectFrontmatter } from '@/utils/mdx'

interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
}

interface ProjectsListProps {
  projects: Array<Project | null>
}

const INITIAL_DISPLAY_COUNT = 5

export function ProjectsList({ projects }: ProjectsListProps) {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT)

  // Filter out null projects
  const validProjects = projects.filter((project): project is Project => project !== null)
  const displayedProjects = validProjects.slice(0, displayCount)
  const hasMore = validProjects.length > displayCount

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + INITIAL_DISPLAY_COUNT, validProjects.length))
  }

  if (validProjects.length === 0) {
    return (
      <p className="text-md leading-[1.75] text-tertiary">
        No projects available at the moment.
      </p>
    )
  }

  return (
    <>
      <ul className="grid gap-3 @lg/projects">
        {displayedProjects.map((project) => {
          if (!project) return null
          return (
            <li key={project.slug} className="flex">
              <ProjectCard
                title={project.frontmatter.title}
                description={project.frontmatter.description}
                slug={project.slug}
                icon={project.frontmatter.icon}
                tags={project.frontmatter.tags}
              />
            </li>
          )
        })}
      </ul>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <BaseButton
            variant="secondary"
            onClick={handleLoadMore}
            className="px-6"
          >
            Load More
          </BaseButton>
        </div>
      )}
    </>
  )
}
