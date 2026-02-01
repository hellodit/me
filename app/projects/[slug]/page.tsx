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
  return getProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: `${project.frontmatter.title} - Asdita Prasetya`,
    description: project.frontmatter.description,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { frontmatter, content } = project
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="pt-6 pb-12 sm:py-10">
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

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-faded">
          <time dateTime={frontmatter.date}>{formattedDate}</time>
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

      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
