import { ProjectCard } from '@/components/ProjectCard'
import { getAllProjects } from '@/utils/mdx'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Asdita Prasetya',
  description: 'Personal projects by Asdita Prasetya',
  alternates: {
    canonical: '/projects',
  },
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="mx-auto pt-6 pb-12 max-w-160 space-y-12 sm:py-10">
      <section className="@container/projects">
        <h1 className="mb-4 font-sans font-semibold text-[1.375rem] leading-7 tracking-[0.02em]">
          Projects
        </h1>

        <p className="mb-8 text-md leading-[1.75] text-tertiary">
          These are my personal projects, both past and ongoing:
        </p>

        {projects.length === 0 ? (
          <p className="text-md leading-[1.75] text-tertiary">
            No projects available at the moment.
          </p>
        ) : (
          <ul className="grid gap-3 @lg/projects:grid-cols-2">
            {projects.map((project) => {
              if (!project) return null
              return (
                <li key={project.slug}>
                  <ProjectCard
                    title={project.frontmatter.title}
                    description={project.frontmatter.description}
                    status={project.frontmatter.status}
                    slug={project.slug}
                    tags={project.frontmatter.tags}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
