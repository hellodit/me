import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { Navbar } from '@/components/layout/Navbar'
import { cn } from '@/utils/css'

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn('group relative z-50 flex items-center justify-between mx-auto h-16 px-4 max-w-2xl bg-transparent sm:px-6 lg:px-8', className)}>
      <Link href="/" className="flex items-center gap-1 overflow-hidden select-none shrink-0">
        <span className="relative z-[1] shrink-0 bg-white">
          <Logo className="size-5 fill-accent" />
        </span>

        <span className="font-bold text-base leading-5 tracking-[0.025em] text-secondary uppercase sm:text-[1.0625rem]">
          AP
        </span>
      </Link>

      <Navbar />
    </header>
  )
}
