import Image from 'next/image'
import { AnimatedRole } from '@/components/AnimatedRole'
import { IconFlagIndonesia } from '@/components/icons/flags/IconFlagIndonesia'
import { HomeHeroActions } from '@/components/pages/home/HomeHeroActions'
import profileData from '@/data/profile.json'
import { HomeSocials } from './HomeSocials'

export function HomeHero() {
  const { name, avatar, greeting, roles, location, description } = profileData

  return (
    <section>
      <Image
        className="mb-4 size-11 rounded-full object-cover"
        src={avatar.src}
        alt={avatar.alt}
        width={44}
        height={44}
        draggable={false}
      />

      <h1 className="mb-4 font-sans font-semibold text-xl leading-7 tracking-[0.02em] sm:text-[1.375rem]">
        {greeting}{' '}
        <span className="border-b-[0.09375rem] border-current text-accent">{name}</span>!
      </h1>

      <div className="mb-5 text-sm leading-[1.75] space-y-3 sm:text-md sm:space-y-0">
        <p>
          <span className="sm:inline-block sm:mb-1.75">
            A <AnimatedRole roles={roles} /> based in {location.city}, <span className="sm:hidden">{location.country}. </span>
            <span className="hidden sm:inline-flex sm:items-center sm:gap-1.5">
              {location.country}
              <IconFlagIndonesia className="shrink-0 w-3 h-2.25 rounded-xs drop-shadow-[0_0_1px_rgba(0,0,0,0.1)]" />
            </span>
          </span>
        </p>

        <p>{description}</p>
      </div>

      <HomeSocials />
      {/* <HomeHeroActions /> */}
    </section>
  )
}
