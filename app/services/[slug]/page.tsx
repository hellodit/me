import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { getServiceBySlug, getServiceSlugs } from '@/utils/mdx'
import { markdownComponents } from '@/components/MarkdownComponents'
import { cn } from '@/utils/css'
import type { Metadata } from 'next'

const BADGE_COLORS = [
  'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
  'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
  'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30',
  'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
] as const

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

function normalizeBadges(badge?: string | string[]): string[] {
  if (!badge) return []
  if (Array.isArray(badge)) return badge.filter(Boolean).map((b) => b.trim())
  return badge.split(',').map((b) => b.trim()).filter(Boolean)
}

export async function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return { title: 'Produk Tidak Ditemukan' }
  }

  return {
    title: `${service.frontmatter.title} - Asdita Prasetya`,
    alternates: {
      canonical: `/services/${slug}`,
    },
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const { frontmatter, content } = service
  const badges = normalizeBadges(frontmatter.badge)

  return (
    <article className="pt-6 pb-12 sm:py-10">
      <header className="mb-8">
        <Link
          href="/services"
          className="mb-4 inline-block text-sm text-faded hover:text-accent transition-colors"
        >
          ← Kembali ke Produk Digital
        </Link>

        <div className="relative w-full aspect-video max-w-2xl rounded-lg overflow-hidden bg-layout-secondary-contrast mb-6">
          <Image
            src={frontmatter.thumbnail}
            alt={frontmatter.title}
            fill
            className="object-cover"
            sizes="(max-width: 672px) 100vw, 672px"
            priority
          />
        </div>

        {badges.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {badges.map((b, i) => (
              <span
                key={b}
                className={cn(
                  'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
                  BADGE_COLORS[i % BADGE_COLORS.length]
                )}
              >
                {b}
              </span>
            ))}
          </div>
        )}

        <h1 className="mb-3 font-sans font-semibold text-[1.75rem] leading-8 tracking-[0.02em] text-primary">
          {frontmatter.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="text-base font-semibold text-primary">{frontmatter.price}</span>
          <span className="text-tertiary line-through">{frontmatter.originalPrice}</span>
          {frontmatter.orderUrl && (
            <a
              href={frontmatter.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-accent bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Beli sekarang →
            </a>
          )}
        </div>
      </header>

      <div className="service-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
