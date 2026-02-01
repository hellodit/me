import Link from 'next/link'
import { cn } from '@/utils/css'
import type { ArticleFrontmatter } from '@/utils/mdx'

interface ArticleCardProps {
  slug: string
  frontmatter: ArticleFrontmatter
}

export function ArticleCard({ slug, frontmatter }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${slug}`}
      className="group block p-3 bg-layout-secondary-active border border-layout-primary rounded-lg transition-all duration-300 hover:border-accent hover:ring-2 hover:ring-accent/20 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 sm:p-4"
    >
      <h3 className="mb-2 font-medium text-sm text-primary group-hover:text-accent transition-colors sm:text-md">
        {frontmatter.title}
      </h3>
      <p className="mb-3 text-xs leading-[1.75] text-tertiary sm:text-sm">{frontmatter.description}</p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 text-xs text-faded">
        <time dateTime={frontmatter.date}>
          {new Date(frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <span className="flex items-center gap-2 flex-wrap">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-zinc-100 rounded text-xs">
                {tag}
              </span>
            ))}
          </span>
        )}
      </div>
    </Link>
  )
}
