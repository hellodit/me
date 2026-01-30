import { IconHugeLinkSquare02 } from '@/components/icons/huge/IconHugeLinkSquare02'
import Link from 'next/link'
import { cn } from '@/utils/css'

interface ProjectCardProps {
  title: string
  description: string
  slug?: string
  icon?: React.ReactNode
  tags?: string[]
}

const cardClassName =
  'group block p-4 rounded-lg bg-layout-secondary-active border border-layout-primary outline-none transition-all duration-200 hover:border-zinc-300 hover:shadow-sm'

export function ProjectCard({
  title,
  description,
  slug,
  icon,
  tags,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className={cardClassName}>
          <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-2">
          {icon && (
            <div className="shrink-0 grid place-content-center size-6 rounded-sm border border-layout-primary bg-layout-secondary-contrast [&>svg]:size-4">
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3
              className={cn(
                'font-medium text-md text-primary',
                slug && 'transition-colors group-hover:text-accent'
              )}
            >
              {title}
            </h3>
            <p className="mt-1 text-sm leading-[1.6] text-tertiary">{description}</p>
            {tags && tags.length > 0 && (
              <p className="mt-2 text-xs text-faded">
                {tags.map((tag) => `#${tag}`).join(' ')}
              </p>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
            <IconHugeLinkSquare02
              className={cn(
                'size-3.5 fill-zinc-400 transition-all duration-200',
                'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
              )}
            />
        </div>
      </div>
    </Link>
  )
}
