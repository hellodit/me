import { ProjectsSlider } from '@/components/pages/home/ProjectsSlider'
import { getAllProjects } from '@/utils/mdx'
import Link from 'next/link'

export function HomeProjects() {
  const projects = getAllProjects()

  return (
    <section className="@container/projects">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <h2 className="font-sans font-medium text-sm text-black tracking-[0.02em] uppercase sm:text-md">
            Projects
          </h2>
          <p className="mt-2 text-sm sm:text-md">These are my personal projects, both past and ongoing:</p>
        </div>
        <Link
          href="/projects"
          className="group relative self-start block rounded-lg border border-layout-primary bg-layout-secondary-active p-2 outline-none transition-all duration-300 hover:border-accent hover:ring-2 hover:ring-accent/20 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 sm:self-auto"
        >
          <span className="text-xs font-medium text-black sm:font-xs">View Projects</span>
        </Link>
      </div>

      <ProjectsSlider projects={projects} />
    </section>
  )
}
