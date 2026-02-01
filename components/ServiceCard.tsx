import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utils/css'

interface ServiceCardProps {
  title: string
  thumbnail: string
  price: string
  originalPrice: string
  orderUrl?: string
  className?: string
}

const cardBaseClassName =
  'group flex flex-col h-full w-full rounded-lg border border-layout-primary bg-layout-secondary-active overflow-hidden transition-all duration-300 hover:border-accent hover:ring-2 hover:ring-accent/20 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20'

export function ServiceCard({
  title,
  thumbnail,
  price,
  originalPrice,
  orderUrl,
  className,
}: ServiceCardProps) {
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
        <h3 className="mb-2 font-medium text-sm text-primary line-clamp-2 sm:mb-3 sm:text-md">
          {title}
        </h3>
        <div className="mt-auto flex items-center gap-2 flex-wrap">
          <span className="text-base font-semibold text-primary sm:text-lg">{price}</span>
          <span className="text-xs text-tertiary line-through sm:text-sm">{originalPrice}</span>
        </div>
      </div>
    </>
  )

  if (orderUrl) {
    return (
      <Link
        href={orderUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(cardBaseClassName, className)}
      >
        {content}
      </Link>
    )
  }

  return <div className={cn(cardBaseClassName, className)}>{content}</div>
}
