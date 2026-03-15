import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utils/css'

interface ServiceCardProps {
  slug: string
  title: string
  thumbnail: string
  price: string
  originalPrice: string
  orderUrl?: string
  badge?: string | string[]
  className?: string
}

const cardBaseClassName =
  'group flex flex-col h-full w-full rounded-lg border border-layout-primary bg-layout-secondary-active overflow-hidden transition-all duration-300 hover:border-accent hover:ring-2 hover:ring-accent/20 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20'

function normalizeBadges(badge?: string | string[]): string[] {
  if (!badge) return []
  if (Array.isArray(badge)) return badge.filter(Boolean).map((b) => b.trim())
  return badge.split(',').map((b) => b.trim()).filter(Boolean)
}

const BADGE_COLORS = [
  'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
  'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
  'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30',
  'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
] as const

export function ServiceCard({
  slug,
  title,
  thumbnail,
  price,
  originalPrice,
  orderUrl,
  badge,
  className,
}: ServiceCardProps) {
  const badges = normalizeBadges(badge)
  const content = (
    <>
      <div className="relative w-full aspect-video bg-layout-secondary-contrast overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      <div className="p-3 flex flex-col flex-1 sm:p-4">
        {badges.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5 text-xs">
            {badges.map((b, i) => (
              <span
                key={b}
                className={cn(
                  'inline-flex items-center rounded-md border px-2 py-0.5 font-medium',
                  BADGE_COLORS[i % BADGE_COLORS.length]
                )}
              >
                {b}
              </span>
            ))}
          </div>
        )}
        <h3 className="mb-2 text-bold font-xl text-2xl text-primary line-clamp-2 sm:mb-3 sm:text-2xl">
          {title}
        </h3>
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-semibold text-primary sm:text-lg">{price}</span>
            <span className="text-xs text-tertiary line-through sm:text-sm">{originalPrice}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {orderUrl && (
              <Link
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-accent bg-accent px-3 py-1 text-sm font-medium text-white transition-colors hover:opacity-90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                Pelajari lebih lanjut →
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )

  return <div className={cn(cardBaseClassName, className)}>{content}</div>
}
