'use client'

import { useState } from 'react'
import { ArticleCard } from '@/components/ArticleCard'
import { BaseButton } from '@/components/ui/BaseButton'
import type { ArticleFrontmatter } from '@/utils/mdx'

interface Article {
  slug: string
  frontmatter: ArticleFrontmatter
}

interface ArticlesListProps {
  articles: Array<Article | null>
}

const INITIAL_DISPLAY_COUNT = 4

export function ArticlesList({ articles }: ArticlesListProps) {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT)

  // Filter out null articles
  const validArticles = articles.filter((article): article is Article => article !== null)
  const displayedArticles = validArticles.slice(0, displayCount)
  const hasMore = validArticles.length > displayCount

  const handleReadMore = () => {
    setDisplayCount((prev) => Math.min(prev + INITIAL_DISPLAY_COUNT, validArticles.length))
  }

  if (validArticles.length === 0) {
    return (
      <p className="text-md leading-[1.75] text-tertiary">
        Coming soon. Articles and blog posts will be available here.
      </p>
    )
  }

  return (
    <>
      <ul className="grid gap-4">
        {displayedArticles.map((article) => {
          if (!article) return null
          return (
            <li key={article.slug}>
              <ArticleCard slug={article.slug} frontmatter={article.frontmatter} />
            </li>
          )
        })}
      </ul>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <BaseButton
            variant="secondary"
            onClick={handleReadMore}
            className="px-6"
          >
            Read More ({validArticles.length - displayCount} remaining)
          </BaseButton>
        </div>
      )}
    </>
  )
}
