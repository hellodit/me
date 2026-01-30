import { IconAnalytics01 } from '@/components/icons/huge/IconAnalytics01'
import { IconHugeBookmark01 } from '@/components/icons/huge/IconHugeBookmark01'
import { LogoProjectBlueskyMeter } from '@/components/logos/projects/LogoProjectBlueskyMeter'
import { LogoProjectListingCat } from '@/components/logos/projects/LogoProjectListingCat'

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  analytics: IconAnalytics01,
  'analytics-platform': IconAnalytics01,
  listingcat: LogoProjectListingCat,
  'bluesky-meter': LogoProjectBlueskyMeter,
  'oke-job-hrms': IconHugeBookmark01,
}

interface ProjectIconProps {
  name: string
  className?: string
}

export function ProjectIcon({ name, className }: ProjectIconProps) {
  const Icon = iconMap[name] ?? IconHugeBookmark01
  return <Icon className={className} />
}
