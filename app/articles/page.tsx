import { ArticleCard } from '@/components/ArticleCard'
import { getAllArticles } from '@/utils/mdx'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Articles - Asdita Prasetya',
  description: 'Articles and blog posts by Asdita Prasetya',
  alternates: {
    canonical: '/articles',
  },
}

export default function ArticlesPage() {
  const articles = getAllArticles()

  return (
    <div className="mx-auto pt-6 pb-12 max-w-160 space-y-12 sm:py-10">
      <section>
        <h1 className="mb-4 font-sans font-semibold text-[1.375rem] leading-7 tracking-[0.02em]">
          Articles
        </h1>

        {articles.length === 0 ? (
          <p className="text-md leading-[1.75] text-tertiary">
            Coming soon. Articles and blog posts will be available here.
          </p>
        ) : (
          <ul className="grid gap-4">
            {articles.map((article) => {
              if (!article) return null
              return (
                <li key={article.slug}>
                  <ArticleCard slug={article.slug} frontmatter={article.frontmatter} />
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
