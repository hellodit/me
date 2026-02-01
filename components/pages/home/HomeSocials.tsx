import { IconHugeBluesky } from '@/components/icons/huge/IconHugeBluesky'
import { IconHugeBookmark01 } from '@/components/icons/huge/IconHugeBookmark01'
import { IconHugeInstagram } from '@/components/icons/huge/IconHugeInstagram'
import { IconHugeLinkedIn01 } from '@/components/icons/huge/IconHugeLinkedIn01'
import { IconHugeNewTwitter } from '@/components/icons/huge/IconHugeNewTwitter'
import { IconHugeThreads } from '@/components/icons/huge/IconHugeThreads'
import { IconHugeTiktok } from '@/components/icons/huge/IconHugeTiktok'
import { IconHugeYoutube } from '@/components/icons/huge/IconHugeYoutube'
import { SectionHeader } from '@/components/SectionHeader'
import profileData from '@/data/profile.json'

const socialIcons: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>
> = {
  x: IconHugeNewTwitter,
  threads: IconHugeThreads,
  bluesky: IconHugeBluesky,
  linkedin: IconHugeLinkedIn01,
  substack: IconHugeBookmark01,
  instagram: IconHugeInstagram,
  youtube: IconHugeYoutube,
  tiktok: IconHugeTiktok,
}

const socialFill: Record<string, string> = {
  x: 'fill-primary',
  threads: 'fill-primary',
  bluesky: 'fill-[#0085dd]',
  linkedin: 'fill-[#0a66c2]',
  substack: 'fill-[#fe6a09]',
  instagram: 'fill-primary',
  youtube: 'fill-[#ff0000]',
  tiktok: 'fill-primary',
}

export function HomeSocials() {
  const { findMeOn } = profileData
  const socialLinks = findMeOn.socials
    .map((social) => {
      const Icon = socialIcons[social.id]
      if (!social.href || !Icon) return null
      const fill = socialFill[social.id] ?? 'fill-primary'
      return { ...social, Icon, fill }
    })
    .filter((link): link is NonNullable<typeof link> => link !== null)

  return (
    <section>
      <SectionHeader
        heading={findMeOn.heading}
      />

      <ul className="flex flex-wrap items-center gap-2.5">
        {socialLinks.map((link) => (
          <li className="group" key={link.id}>
            <a
              className="inline-flex items-center gap-2 px-2.5 h-6 bg-zinc-100 rounded-full outline-none font-medium text-xs text-secondary transition-all hover:bg-zinc-200/75 focus:ring-3 focus:ring-zinc-200"
              href={link.href}
              target="_blank"
            >
              <link.Icon className={`shrink-0 size-4 group-first:size-3.5 ${link.fill}`} />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
