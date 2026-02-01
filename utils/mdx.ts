import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const contentDirectory = join(process.cwd(), 'content')

export interface ArticleFrontmatter {
  title: string
  description: string
  date: string
  author?: string
  tags?: string[]
}

export interface ProjectFrontmatter {
  title: string
  description: string
  status: 'active' | 'in development' | 'sold' | 'archived'
  date: string
  link?: string
  icon?: string
  tags?: string[]
}

export interface ServiceFrontmatter {
  title: string
  thumbnail: string
  price: string
  originalPrice: string
}

function parseFrontmatter(content: string): { frontmatter: Record<string, unknown>; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { frontmatter: {}, body: content }
  }

  const frontmatterString = match[1]
  const body = match[2]

  const frontmatter: Record<string, unknown> = {}
  const lines = frontmatterString.split('\n')

  for (const line of lines) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue

    const key = line.slice(0, colonIndex).trim()
    let value: unknown = line.slice(colonIndex + 1).trim()

    // Remove quotes if present
    if (typeof value === 'string') {
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
    }

    // Parse arrays
    if (value === '[]') {
      value = []
    } else if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1)
      value = arrayContent
        .split(',')
        .map((item) => item.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    }

    // Parse booleans
    if (value === 'true') value = true
    if (value === 'false') value = false

    frontmatter[key] = value
  }

  return { frontmatter, body }
}

export function getArticleSlugs() {
  const articlesDir = join(contentDirectory, 'articles')
  try {
    return readdirSync(articlesDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''))
  } catch {
    return []
  }
}

export function getProjectSlugs() {
  const projectsDir = join(contentDirectory, 'projects')
  try {
    return readdirSync(projectsDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''))
  } catch {
    return []
  }
}

export function getArticleBySlug(slug: string) {
  const fullPath = join(contentDirectory, 'articles', `${slug}.mdx`)
  try {
    const fileContents = readFileSync(fullPath, 'utf8')
    const { frontmatter, body } = parseFrontmatter(fileContents)
    return {
      slug,
      frontmatter: frontmatter as ArticleFrontmatter,
      content: body,
    }
  } catch {
    return null
  }
}

export function getProjectBySlug(slug: string) {
  const fullPath = join(contentDirectory, 'projects', `${slug}.mdx`)
  try {
    const fileContents = readFileSync(fullPath, 'utf8')
    const { frontmatter, body } = parseFrontmatter(fileContents)
    return {
      slug,
      frontmatter: frontmatter as ProjectFrontmatter,
      content: body,
    }
  } catch {
    return null
  }
}

export function getAllArticles() {
  const slugs = getArticleSlugs()
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article) => article !== null)
    .sort((a, b) => {
      if (!a || !b) return 0
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    })
}

export function getAllProjects() {
  const slugs = getProjectSlugs()
  return slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project) => project !== null)
    .sort((a, b) => {
      if (!a || !b) return 0
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    })
}

export function getServiceSlugs() {
  const servicesDir = join(contentDirectory, 'service')
  try {
    return readdirSync(servicesDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''))
  } catch {
    return []
  }
}

export function getServiceBySlug(slug: string) {
  const fullPath = join(contentDirectory, 'service', `${slug}.mdx`)
  try {
    const fileContents = readFileSync(fullPath, 'utf8')
    const { frontmatter, body } = parseFrontmatter(fileContents)
    return {
      slug,
      frontmatter: frontmatter as ServiceFrontmatter,
      content: body,
    }
  } catch {
    return null
  }
}

export function getAllServices() {
  const slugs = getServiceSlugs()
  return slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service) => service !== null)
}
