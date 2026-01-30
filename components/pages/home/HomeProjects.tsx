import { IconAnalytics01 } from '@/components/icons/huge/IconAnalytics01'
import { LogoProjectBlueskyMeter } from '@/components/logos/projects/LogoProjectBlueskyMeter'
import { LogoProjectListingCat } from '@/components/logos/projects/LogoProjectListingCat'
import { ProjectCard } from '@/components/ProjectCard'
import { SectionHeader } from '@/components/SectionHeader'
import Link from 'next/link'
import type { ProjectStatusType } from '@/types/ProjectStatusType'

interface Project {
  title: string
  description: string
  status: ProjectStatusType
  slug: string
  icon: React.ReactNode
}

export function HomeProjects() {
  const projects: Array<Project> = [
    {
      title: 'Analytics',
      description: 'Open-source product and web analytics.',
      status: 'in development',
      slug: 'analytics-platform',
      icon: <IconAnalytics01 className="fill-inherit" />,
    },
    {
      title: 'Listing Cat',
      description: 'Marketing database for startups and indie hackers.',
      status: 'active',
      slug: 'listingcat',
      icon: <LogoProjectListingCat />,
    },
    {
      title: 'Bluesky Meter',
      description: 'Realtime analytics for Bluesky social network.',
      status: 'sold',
      slug: 'bluesky-meter',
      icon: <LogoProjectBlueskyMeter />,
    },
  ]

  return (
    <section className="@container/projects">
      <SectionHeader
        heading="Projects"
        text="These are my personal projects, both past and ongoing:"
      />



      <ul className="grid gap-3 @lg/projects:grid-cols-2">
        {projects.map((project) => (
          <li key={project.title}>
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>

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
