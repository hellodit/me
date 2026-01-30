import Link from 'next/link'
import { BaseButton } from '@/components/ui/BaseButton'

export default function NotFound() {
  return (
    <div className="mx-auto pt-6 pb-12 max-w-160 space-y-12 sm:py-10">
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="mb-4 font-sans font-semibold text-[2rem] leading-8 tracking-[0.02em]">
          404
        </h1>
        <h2 className="mb-4 font-sans font-semibold text-[1.375rem] leading-7 tracking-[0.02em]">
          Page Not Found
        </h2>
        <p className="mb-8 text-md leading-[1.75] text-tertiary max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center gap-4">
          <BaseButton variant="primary" asChild>
            <Link href="/">Go Home</Link>
          </BaseButton>
          <BaseButton variant="secondary" asChild>
            <Link href="/projects">View Projects</Link>
          </BaseButton>
        </div>
      </section>
    </div>
  )
}
