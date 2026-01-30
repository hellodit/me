import { ProjectsSlider } from '@/components/pages/home/ProjectsSlider'
import { SectionHeader } from '@/components/SectionHeader'
import { getAllProjects } from '@/utils/mdx'
import Link from 'next/link'

export function HomeProjects() {
  const projects = getAllProjects()

  return (
    <section className="@container/projects">
      <SectionHeader
        heading="Projects"
        text="These are my personal projects, both past and ongoing:"
      />

      <ProjectsSlider projects={projects} />

      <div className="mb-4 mt-5 flex justify-center">
        <Link
          href="/projects"
          className="group relative block rounded-lg border border-layout-primary bg-layout-secondary-active p-2 outline-none transition-colors hover:border-zinc-300 focus-visible:border-zinc-300"
        >
          <span className="font-xs text-black">View Projects</span>
        </Link>
      </div>
    </section>
  )
}
