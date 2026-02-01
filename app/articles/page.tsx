import { ArticlesList } from '@/components/ArticlesList'
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
    <div className="pt-6 pb-12 space-y-12 sm:py-10">
      <section>
        <h1 className="mb-4 font-sans font-semibold text-[1.375rem] leading-7 tracking-[0.02em]">
          Articles
        </h1>

        <ArticlesList articles={articles} />
      </section>
    </div>
  )
}
