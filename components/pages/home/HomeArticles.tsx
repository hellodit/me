import { ArticleCard } from '@/components/ArticleCard'
import { getAllArticles } from '@/utils/mdx'
import Link from 'next/link'

export function HomeArticles() {
  const articles = getAllArticles().slice(0, 4)

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-sans font-medium text-md text-black tracking-[0.02em] uppercase">
            Articles
          </h2>
          <p className="mt-2 text-md">Latest articles and blog posts:</p>
        </div>
        <Link
          href="/articles"
          className="group relative block rounded-lg border border-layout-primary bg-layout-secondary-active p-2 outline-none transition-all duration-300 hover:border-accent hover:ring-2 hover:ring-accent/20 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20"
        >
          <span className="font-xs text-black">View  Articles</span>
        </Link>
      </div>

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
  )
}
