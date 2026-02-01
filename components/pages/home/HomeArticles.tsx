import { ArticleCard } from '@/components/ArticleCard'
import { getAllArticles } from '@/utils/mdx'
import Link from 'next/link'

export function HomeArticles() {
  const articles = getAllArticles().slice(0, 4)

  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <h2 className="font-sans font-medium text-sm text-black tracking-[0.02em] uppercase sm:text-md">
            Articles
          </h2>
          <p className="mt-2 text-sm sm:text-md">Latest articles and blog posts:</p>
        </div>
        <Link
          href="/articles"
          className="group relative self-start block rounded-lg border border-layout-primary bg-layout-secondary-active p-2 outline-none transition-all duration-300 hover:border-accent hover:ring-2 hover:ring-accent/20 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 sm:self-auto"
        >
          <span className="text-xs font-medium text-black sm:font-xs">View Articles</span>
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="text-sm leading-[1.75] text-tertiary sm:text-md">
          Coming soon. Articles and blog posts will be available here.
        </p>
      ) : (
        <ul className="grid gap-3 sm:gap-4">
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
