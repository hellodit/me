import { IconHugeLinkSquare02 } from '@/components/icons/huge/IconHugeLinkSquare02'
import Link from 'next/link'
import { ProjectIcon } from '@/components/ProjectIcon'
import { cn } from '@/utils/css'

interface ProjectCardProps {
  title: string
  description: string
  slug?: string
  icon?: string
  tags?: string[]
  className?: string
}

const cardBaseClassName =
  'group flex min-h-0 flex-1 flex-col rounded-lg border border-layout-primary bg-layout-secondary-active p-4 outline-none transition-all duration-300 hover:border-accent hover:ring-2 hover:ring-accent/20 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20'

export function ProjectCard({
  title,
  description,
  slug,
  icon,
  tags,
  className,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className={cn(cardBaseClassName, className)}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-start gap-2">
          {icon && (
            <div className="shrink-0 grid place-content-center size-6 rounded-sm border border-layout-primary bg-layout-secondary-contrast [&>svg]:size-4">
              <ProjectIcon name={icon} className="fill-inherit" />
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
            <p className="mt-1 line-clamp-3 text-sm leading-[1.6] text-tertiary">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-3 flex shrink-0 items-center justify-end gap-2">
          {tags && tags.length > 0 && (
            <p className="flex-1 truncate text-xs text-faded">
              {tags.map((tag) => `#${tag}`).join(' ')}
            </p>
          )}
          {/* Move the icon to the very bottom */}
        </div>
        <div className="flex justify-end">
          <IconHugeLinkSquare02
            className={cn(
              'size-3.5 shrink-0 fill-zinc-400 transition-all duration-200',
              'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
            )}
          />
        </div>
      </div>
    </Link>
  )
}
