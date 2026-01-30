'use client'

import { useHotkeys } from 'react-hotkeys-hook'
import { BaseButton } from '@/components/ui/BaseButton'
import profileData from '@/data/profile.json'

export function HomeHeroActions() {
  const { links } = profileData

  useHotkeys('b', () => {
    window.open(links.calcom, '_blank')
  })

  useHotkeys('e', () => {
    const a = document.createElement('a')
    a.href = `mailto:${links.email}`
    a.style.display = 'none'

    document.body.appendChild(a)

    a.click()
    a.remove()
  })

  useHotkeys('r', () => {
    if (links.resume) {
      window.open(links.resume, '_blank')
    }
  })

  return (
    <div className="flex flex-wrap items-center gap-4">
      <BaseButton className="min-w-33" hotkey="D" variant="primary" asChild>
        <a href={links.calcom} target="_blank">
          Direct Message
        </a>
      </BaseButton>

      <BaseButton hotkey="E" variant="secondary" asChild>
        <a href={`mailto:${links.email}`}>Send an email</a>
      </BaseButton>
    </div>
  )
}
