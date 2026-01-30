import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { Navbar } from '@/components/layout/Navbar'
import { cn } from '@/utils/css'

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn('group flex items-center justify-between mx-auto h-16 max-w-160', className)}>
      <Link href="/" className="flex items-center gap-1 overflow-hidden select-none">
        <span className="relative z-[1] shrink-0 bg-white">
          <Logo className="size-5 fill-accent" />
        </span>

        <span className="font-bold text-[1.0625rem] leading-5 tracking-[0.025em] text-secondary uppercase">
          AP
        </span>
      </Link>

      <Navbar />
    </header>
  )
}
