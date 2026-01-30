import Link from 'next/link'
import { ProjectStatus } from '@/components/ProjectStatus'
import { cn } from '@/utils/css'
import type { ProjectFrontmatter } from '@/utils/mdx'

interface ProjectCardMDXProps {
  slug: string
  frontmatter: ProjectFrontmatter
}

export function ProjectCardMDX({ slug, frontmatter }: ProjectCardMDXProps) {
  const Component = frontmatter.link ? 'a' : Link
  const href = frontmatter.link || `/projects/${slug}`

  return (
    <Component
      href={href}
      target={frontmatter.link ? '_blank' : undefined}
      rel={frontmatter.link ? 'noopener noreferrer' : undefined}
      className={cn(
        'block p-4 bg-layout-secondary-active border border-layout-primary rounded-lg',
        'group relative ring-3 ring-transparent outline-none cursor-pointer transition-all duration-300',
        'hover:border-zinc-300 hover:ring-zinc-100 focus-visible:border-zinc-300 focus-visible:ring-zinc-100'
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-medium text-md text-primary">{frontmatter.title}</h3>
        <ProjectStatus status={frontmatter.status} />
      </div>
      <p className="mb-3 text-sm leading-[1.75] text-tertiary">{frontmatter.description}</p>
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {frontmatter.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-zinc-100 rounded text-xs text-tertiary">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Component>
  )
}
