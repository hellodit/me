import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ProjectStatus } from '@/components/ProjectStatus'
import { getProjectBySlug, getProjectSlugs } from '@/utils/mdx'
import type { Metadata } from 'next'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) {
    return { title: 'Project Not Found' }
  }
  const { frontmatter } = project
  return {
    title: `${frontmatter.title} - Asdita Prasetya`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  }
}

const markdownComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="mb-4 mt-8 font-sans font-semibold text-[1.5rem] leading-8 tracking-[0.02em] text-primary first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="mb-3 mt-6 font-sans font-semibold text-[1.25rem] leading-7 tracking-[0.02em] text-primary">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="mb-2 mt-4 font-sans font-medium text-[1.125rem] leading-6 text-primary">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-4 text-md leading-[1.75] text-secondary">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-4 ml-4 list-disc space-y-1 text-md leading-[1.75] text-secondary">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-4 ml-4 list-decimal space-y-1 text-md leading-[1.75] text-secondary">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => <li className="pl-1">{children}</li>,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) =>
    href?.startsWith('/') ? (
      <Link href={href} className="text-accent underline hover:no-underline">
        {children}
      </Link>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline hover:no-underline"
      >
        {children}
      </a>
    ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-primary">{children}</strong>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="mb-4 border-l-4 border-layout-primary pl-4 italic text-tertiary">
      {children}
    </blockquote>
  ),
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) =>
    className ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="rounded bg-layout-secondary-active px-1.5 py-0.5 font-mono text-sm text-primary">
        {children}
      </code>
    ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="mb-4 overflow-x-auto rounded-lg border border-layout-primary bg-layout-secondary-active p-4 font-mono text-sm">
      {children}
    </pre>
  ),
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { frontmatter, content } = project

  return (
    <article className="mx-auto max-w-160 pt-6 pb-12 sm:py-10">
      <header className="mb-8">
        <Link
          href="/projects"
          className="mb-4 inline-block text-sm text-faded hover:text-accent transition-colors"
        >
          ← Back to Projects
        </Link>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h1 className="font-sans font-semibold text-[1.75rem] leading-8 tracking-[0.02em] text-primary">
            {frontmatter.title}
          </h1>
          <ProjectStatus status={frontmatter.status} />
        </div>
        <p className="mb-4 text-md leading-[1.75] text-tertiary">{frontmatter.description}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-faded">
          <time dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {frontmatter.link && (
            <>
              <span aria-hidden>·</span>
              <a
                href={frontmatter.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Visit project →
              </a>
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

      <div className="project-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
