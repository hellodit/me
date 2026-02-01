import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const MEDIUM_RSS_URL = 'https://medium.com/feed/@hellodit'
const CONTENT_DIR = join(process.cwd(), 'content', 'articles')

// Simple XML parser for RSS feed
function parseRSS(xml) {
  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match
  
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemContent = match[1]
    const item = {}
    
    // Extract title
    const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/s)
    item.title = titleMatch ? (titleMatch[1] || titleMatch[2]) : ''
    
    // Extract link
    const linkMatch = itemContent.match(/<link>(.*?)<\/link>/s)
    item.link = linkMatch ? linkMatch[1].trim() : ''
    
    // Extract pubDate
    const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/s)
    item.pubDate = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString()
    
    // Extract description
    const descMatch = itemContent.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>(.*?)<\/description>/s)
    item.description = descMatch ? (descMatch[1] || descMatch[2]) : ''
    
    // Extract content:encoded
    const contentMatch = itemContent.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/s)
    item.content = contentMatch ? contentMatch[1] : item.description
    
    // Extract categories/tags
    const categoryRegex = /<category><!\[CDATA\[(.*?)\]\]><\/category>|<category>(.*?)<\/category>/g
    item.categories = []
    let catMatch
    while ((catMatch = categoryRegex.exec(itemContent)) !== null) {
      const tag = (catMatch[1] || catMatch[2] || '').trim()
      if (tag) {
        item.categories.push(tag)
      }
    }
    
    items.push(item)
  }
  
  return items
}

// Helper function to convert HTML to Markdown (basic conversion)
function htmlToMarkdown(html) {
  if (!html) return ''
  
  return html
    // Remove script and style tags
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Convert headers
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
    // Convert paragraphs
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    // Convert strong/bold
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    // Convert emphasis/italic
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    // Convert links
    .replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    // Convert lists
    .replace(/<ul[^>]*>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    // Convert code blocks
    .replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '```\n$1\n```\n\n')
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    // Convert blockquotes
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n')
    // Convert images
    .replace(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, '![$2]($1)')
    .replace(/<img[^>]*src=["']([^"']*)["'][^>]*>/gi, '![]($1)')
    // Remove remaining HTML tags
    .replace(/<[^>]+>/g, '')
    // Clean up multiple newlines
    .replace(/\n{3,}/g, '\n\n')
    // Decode HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .trim()
}

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Format date to YYYY-MM-DD
function formatDate(dateString) {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return new Date().toISOString().split('T')[0]
    }
    return date.toISOString().split('T')[0]
  } catch {
    return new Date().toISOString().split('T')[0]
  }
}

// Extract description from content (first 200 chars)
function extractDescription(content) {
  const text = htmlToMarkdown(content)
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.substring(0, 200) + (text.length > 200 ? '...' : '')
}

async function fetchMediumArticles() {
  try {
    console.log('Fetching Medium RSS feed...')
    console.log(`URL: ${MEDIUM_RSS_URL}`)
    
    // Fetch RSS feed
    const response = await fetch(MEDIUM_RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`)
    }
    
    const xml = await response.text()
    console.log('RSS feed fetched successfully')
    
    // Parse RSS
    const items = parseRSS(xml)
    console.log(`Found ${items.length} articles`)
    
    return items.map((item, index) => {
      const title = item.title || `Untitled Article ${index + 1}`
      const slug = generateSlug(title)
      const description = extractDescription(item.content || item.description)
      const content = item.content || item.description || ''
      const pubDate = item.pubDate || new Date().toISOString()
      const tags = item.categories || []
      
      return {
        slug,
        title,
        description,
        content,
        date: formatDate(pubDate),
        author: 'Asdita Prasetya',
        tags,
        link: item.link
      }
    })
  } catch (error) {
    console.error('Error fetching Medium articles:', error)
    throw error
  }
}

async function saveArticles() {
  try {
    const articles = await fetchMediumArticles()
    
    if (articles.length === 0) {
      console.log('No articles to save')
      return
    }
    
    // Ensure content directory exists
    if (!existsSync(CONTENT_DIR)) {
      throw new Error(`Content directory does not exist: ${CONTENT_DIR}`)
    }
    
    let savedCount = 0
    let skippedCount = 0
    
    for (const article of articles) {
      const filePath = join(CONTENT_DIR, `${article.slug}.mdx`)
      
      // Check if file already exists
      if (existsSync(filePath)) {
        console.log(`Skipping ${article.slug}.mdx (already exists)`)
        skippedCount++
        continue
      }
      
      // Convert HTML content to Markdown
      const markdownContent = htmlToMarkdown(article.content)
      
      // Create frontmatter
      const tagsSection = article.tags.length > 0 
        ? `tags:\n${article.tags.map(tag => `  - ${JSON.stringify(tag)}`).join('\n')}`
        : ''
      
      const frontmatter = `---
title: ${JSON.stringify(article.title)}
description: ${JSON.stringify(article.description)}
date: '${article.date}'
author: ${JSON.stringify(article.author)}
${tagsSection ? tagsSection + '\n' : ''}---

${markdownContent || article.description}
`
      
      // Write file
      writeFileSync(filePath, frontmatter, 'utf-8')
      console.log(`✓ Saved: ${article.slug}.mdx`)
      savedCount++
    }
    
    console.log(`\nSummary:`)
    console.log(`- Saved: ${savedCount} articles`)
    console.log(`- Skipped: ${skippedCount} articles (already exist)`)
    console.log(`- Total: ${articles.length} articles`)
  } catch (error) {
    console.error('Error saving articles:', error)
    process.exit(1)
  }
}

// Run the script
saveArticles()
