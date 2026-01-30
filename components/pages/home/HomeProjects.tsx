import { IconAnalytics01 } from '@/components/icons/huge/IconAnalytics01'
import { IconHugeLinkSquare02 } from '@/components/icons/huge/IconHugeLinkSquare02'
import { LogoProjectBlueskyMeter } from '@/components/logos/projects/LogoProjectBlueskyMeter'
import { LogoProjectListingCat } from '@/components/logos/projects/LogoProjectListingCat'
import { ProjectCard } from '@/components/ProjectCard'
import { SectionHeader } from '@/components/SectionHeader'
import { cn } from '@/utils/css'
import Link from 'next/link'
import profileData from '@/data/profile.json'
import type { ProjectStatusType } from '@/types/ProjectStatusType'

interface Project {
  name: string
  description: string
  status: ProjectStatusType
  icon: React.ReactNode
  link?: string
}

export function HomeProjects() {
  const { links } = profileData

  const projects: Array<Project> = [
    {
      name: 'Analytics',
      description: 'Open-source product and web analytics.',
      status: 'in development',
      icon: <IconAnalytics01 className="fill-inherit" />,
      link: 'https://github.com/asditaprasetya/analytics',
    },
    {
      name: 'Listing Cat',
      description: 'Marketing database for startups and indie hackers.',
      status: 'active',
      icon: <LogoProjectListingCat />,
      link: links.projects.listingcat,
    },
    {
      name: 'Bluesky Meter',
      description: 'Realtime analytics for Bluesky social network.',
      status: 'sold',
      icon: <LogoProjectBlueskyMeter />,
      link: links.projects.blueskymeter,
    },
    {
      name: 'Bluesky Meter',
      description: 'Realtime analytics for Bluesky social network.',
      status: 'sold',
      icon: <LogoProjectBlueskyMeter />,
      link: links.projects.blueskymeter,
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
          <li key={project.name}>
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>

      <div className="mb-4 mt-5 flex justify-center">
        <Link
          href="/projects"
          className={cn(
            'block p-3 bg-layout-secondary-active border border-layout-primary rounded-lg',
            'group relative ring-3 ring-transparent outline-none cursor-pointer transition-all duration-300',
            'hover:border-zinc-300 hover:ring-zinc-100 focus-visible:border-zinc-300 focus-visible:ring-zinc-100'
          )}
        >
          <span className="font-medium text-md">View All Projects</span>
          <IconHugeLinkSquare02 className="absolute top-3 right-3 size-3.5 fill-zinc-400 opacity-0 transition-opacity transform-gpu duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />
        </Link>
      </div>
    </section>
  )
}
