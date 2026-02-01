import { ProjectsList } from '@/components/ProjectsList'
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
    <div className="pt-6 pb-12 space-y-12 sm:py-10">
      <section className="@container/projects">
        <h1 className="mb-4 font-sans font-semibold text-[1.375rem] leading-7 tracking-[0.02em]">
          Projects
        </h1>

        <p className="mb-8 text-md leading-[1.75] text-tertiary">
          These are my personal projects, both past and ongoing:
        </p>

        <ProjectsList projects={projects} />
      </section>
    </div>
  )
}
