import { BaseButton } from '@/components/ui/BaseButton'
import profileData from '@/data/profile.json'
import consultationData from '@/data/consultation.json'
import type { Metadata } from 'next'

const { links } = profileData

export const metadata: Metadata = {
  title: 'Consultation - Asdita Prasetya',
  description: '1-on-1 consultation with Asdita Prasetya for web development, coding mentorship, and career guidance',
  alternates: {
    canonical: '/consultation',
  },
}

export default function ConsultationPage() {
  const { header, discussionTopics, consultationPackages, schedule, preparation, benefits, cta } = consultationData

  return (
    <div className="pt-6 pb-12 space-y-12 sm:py-10">
      {/* Header */}
      <section>
        <h1 className="mb-4 font-sans font-semibold text-[1.375rem] leading-7 tracking-[0.02em]">
          {header.title}
        </h1>

        <div className="mb-8 space-y-4">
          <div>
            <h2 className="mb-2 font-sans font-semibold text-md text-primary">{header.name}</h2>
            <p className="text-md leading-[1.75] text-tertiary">
              {header.role}
            </p>
            <p className="mt-2 text-sm leading-[1.75] text-tertiary">
              {header.description}
            </p>
          </div>
        </div>
      </section>

      {/* What can we discuss */}
      <section>
        <h2 className="mb-6 font-sans font-semibold text-md text-primary">What can we discuss?</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {discussionTopics.map((topic) => (
            <div
              key={topic.title}
              className="p-4 bg-layout-secondary-active border border-layout-primary rounded-lg"
            >
              <div className="mb-2 text-2xl">{topic.emoji}</div>
              <h3 className="mb-2 font-medium text-md text-primary">{topic.title}</h3>
              <p className="text-sm leading-[1.75] text-tertiary">{topic.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Packages */}
      <section>
        <h2 className="mb-6 font-sans font-semibold text-md text-primary">Choose Consultation Package</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {consultationPackages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative p-6 bg-layout-secondary-active border rounded-lg ${
                pkg.recommended
                  ? 'border-accent ring-2 ring-accent/20'
                  : 'border-layout-primary'
              }`}
            >
              {pkg.recommended && (
                <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded">
                  Recommended
                </span>
              )}
              <h3 className="mb-2 font-sans font-semibold text-md text-primary">{pkg.name}</h3>
              <p className="mb-4 text-sm text-tertiary">{pkg.sessions}</p>
              <div className="mb-4">
                <span className="text-lg font-semibold text-primary">{pkg.discountedPrice}</span>
                <span className="ml-2 text-sm text-tertiary line-through">{pkg.originalPrice}</span>
                <span className="ml-2 text-sm text-accent">Save {pkg.savings}</span>
              </div>
              <ul className="mb-6 space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-tertiary">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <BaseButton variant="primary" className="w-full" asChild>
                <a href={links.calcom} target="_blank">
                  Register Now →
                </a>
              </BaseButton>
            </div>
          ))}
        </div>
      </section>

      {/* Available Schedule */}
      <section>
        <h2 className="mb-4 font-sans font-semibold text-md text-primary">Available Schedule</h2>
        <div className="space-y-2">
          {schedule.slots.map((slot) => (
            <p key={slot.time} className="text-md leading-[1.75] text-tertiary">
              {slot.time}
            </p>
          ))}
        </div>
        <p className="mt-4 text-sm leading-[1.75] text-tertiary">
          {schedule.format}
        </p>
      </section>

      {/* Preparation */}
      <section>
        <h2 className="mb-4 font-sans font-semibold text-md text-primary">Preparation Before Session</h2>
        <ul className="space-y-2">
          {preparation.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-md leading-[1.75] text-tertiary">
              <span className="text-accent mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What you get */}
      <section>
        <h2 className="mb-4 font-sans font-semibold text-md text-primary">What you get</h2>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-md leading-[1.75] text-tertiary">
              <span className="text-accent mt-1">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="pt-4">
        <div className="p-6 bg-layout-secondary-active border border-layout-primary rounded-lg text-center">
          <h2 className="mb-2 font-sans font-semibold text-md text-primary">{cta.title}</h2>
          <p className="mb-6 text-sm text-tertiary">
            {cta.promoCode}
          </p>
          <BaseButton variant="primary" className="min-w-48" asChild>
            <a href={links.calcom} target="_blank">
              Register Now →
            </a>
          </BaseButton>
        </div>
      </section>
    </div>
  )
}
