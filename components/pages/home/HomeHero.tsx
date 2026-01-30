import Image from 'next/image'
import { AnimatedRole } from '@/components/AnimatedRole'
import { IconFlagIndonesia } from '@/components/icons/flags/IconFlagIndonesia'
import { LogoReact } from '@/components/logos/tech/LogoReact'
import { HomeHeroActions } from '@/components/pages/home/HomeHeroActions'

export function HomeHero() {
  return (
    <section>
      <Image
        className="mb-4 size-11 rounded-full object-cover"
        src="/avatar.png?v=3"
        alt="Asdita Prasetya"
        width={44}
        height={44}
        draggable={false}
      />

      <h1 className="mb-4 font-sans font-semibold text-[1.375rem] leading-7 tracking-[0.02em]">
        Hey, I&apos;m{' '}
        <span className="border-b-[0.09375rem] border-current text-accent">Asdita Prasetya</span>!
      </h1>

      <div className="mb-5 text-md leading-[1.75] space-y-3 sm:space-y-0">
        <p>
          <span className="sm:inline-block sm:mb-1.75">
            A <AnimatedRole /> based in Jakarta, <span className="sm:hidden">Indonesia. </span>
            <span className="hidden sm:inline-flex sm:items-center sm:gap-1.5">
              Indonesia
              <IconFlagIndonesia className="shrink-0 w-3 h-2.25 rounded-xs drop-shadow-[0_0_1px_rgba(0,0,0,0.1)]" />
            </span>
          </span>
        </p>

        <p>If you need a reliable developer to join your team, I&apos;m ready to dive in.</p>
      </div>

      <HomeHeroActions />

      <p className="relative mt-4 pl-5 text-xs text-tertiary">
        <span className="absolute left-0 top-1/2 size-3.5 -translate-y-1/2 rounded-full bg-green-500 border-4 border-green-100" />
        Available for hire, let&apos;s talk!
      </p>
    </section>
  )
}
