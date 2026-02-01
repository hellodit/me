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
          className="group relative block rounded-lg border border-layout-primary bg-layout-secondary-active p-2 outline-none transition-colors hover:border-zinc-300 focus-visible:border-zinc-300"
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
