import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { markdownComponents } from '@/components/MarkdownComponents'
import { getArticleBySlug, getArticleSlugs } from '@/utils/mdx'
import type { Metadata } from 'next'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) {
    return { title: 'Article Not Found' }
  }
  const { frontmatter } = article
  return {
    title: `${frontmatter.title} - Asdita Prasetya`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
    },
    alternates: {
      canonical: `/articles/${slug}`,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const { frontmatter, content } = article

  return (
    <article className="pt-6 pb-12 sm:py-10">
      <header className="mb-8">
        <Link
          href="/articles"
          className="mb-4 inline-block text-sm text-faded hover:text-accent transition-colors"
        >
          ← Back to Articles
        </Link>
        <h1 className="mb-3 font-sans font-semibold text-[1.75rem] leading-8 tracking-[0.02em] text-primary">
          {frontmatter.title}
        </h1>
        <p className="mb-4 text-md leading-[1.75] text-tertiary">{frontmatter.description}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-faded">
          <time dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {frontmatter.author && (
            <>
              <span aria-hidden>·</span>
              <span>{frontmatter.author}</span>
            </>
          )}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <span className="flex flex-wrap items-center gap-2">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-layout-secondary-active border border-layout-primary px-2 py-0.5 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </>
          )}
        </div>
      </header>

      <div className="article-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
