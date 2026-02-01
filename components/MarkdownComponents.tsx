import Link from 'next/link'
import type { Components } from 'react-markdown'

export const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-4 mt-8 font-sans font-semibold text-[1.5rem] leading-8 tracking-[0.02em] text-primary first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 mt-6 font-sans font-semibold text-[1.25rem] leading-7 tracking-[0.02em] text-primary">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-4 font-sans font-medium text-[1.125rem] leading-6 text-primary">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-md leading-[1.75] text-secondary">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 ml-4 list-disc space-y-1 text-md leading-[1.75] text-secondary">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 ml-4 list-decimal space-y-1 text-md leading-[1.75] text-secondary">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  a: ({ href, children }) =>
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
  strong: ({ children }) => (
    <strong className="font-semibold text-primary">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-4 border-l-4 border-layout-primary pl-4 italic text-tertiary">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) =>
    className ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="rounded bg-layout-secondary-active px-1.5 py-0.5 font-mono text-sm text-primary">
        {children}
      </code>
    ),
  pre: ({ children }) => (
    <pre className="mb-4 overflow-x-auto rounded-lg border border-layout-primary bg-layout-secondary-active p-4 font-mono text-sm">
      {children}
    </pre>
  ),
}
