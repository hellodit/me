import { BaseButton } from '@/components/ui/BaseButton'
import { links } from '@/data/links'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consultation - Asdita Prasetya',
  description: '1-on-1 consultation with Asdita Prasetya for web development, coding mentorship, and career guidance',
  alternates: {
    canonical: '/consultation',
  },
}

const discussionTopics = [
  {
    emoji: '💻',
    title: 'Web Development & Coding',
    description: 'Have questions about architecture, tech stack, or how to start a new project? I can help you design the solution.',
  },
  {
    emoji: '🤖',
    title: 'AI-Assisted Development',
    description: 'I actively use AI tools for development. If you want to learn how to maximize Claude, ChatGPT, or other tools to code faster, I can share my experience and tricks.',
  },
  {
    emoji: '🌍',
    title: 'Career & Remote Work',
    description: 'Looking for direction in tech? Want to work remotely? Or thinking about a career change? I can share insights from my own journey.',
  },
  {
    emoji: '🔧',
    title: 'Stuck with a Specific Problem?',
    description: 'Have a bug that\'s driving you crazy? Have code that needs review? Or a project you want to plan together? Let\'s discuss directly.',
  },
]

const consultationPackages = [
  {
    name: '1 Hour Consultation',
    sessions: '1x Session • 60 minutes',
    originalPrice: 'Rp250.000',
    discountedPrice: 'Rp150.000',
    savings: 'Rp100.000',
    features: [
      'Consultation for 1 session (total 60 minutes)',
      'Video/Audio recording after consultation',
      'Special discount on digital products',
    ],
  },
  {
    name: '2 Hour Consultation',
    sessions: '2x Sessions • 120 minutes',
    originalPrice: 'Rp500.000',
    discountedPrice: 'Rp250.000',
    savings: 'Rp250.000',
    features: [
      'Consultation for 2 sessions (total 120 minutes)',
      'Video/Audio recording after consultation',
      'Special discount on digital products',
    ],
    recommended: true,
  },
]

const scheduleSlots = [
  { time: 'Morning: 10.00-11.00 WIB' },
  { time: 'Evening: 21.00-22.00 WIB' },
]

const preparationItems = [
  'Questions or specific topics you want to discuss',
  'If about a project: brief about what you\'re working on',
  'If you have code to review: prepare the link or screenshot',
  'Pen & paper or notes app—to note important points',
]

const benefits = [
  'Insights & advice directly from a practitioner',
  'Concrete action plan you can implement immediately',
  'Recording for future reference',
  'Follow-up via chat if you need clarification',
]

export default function ConsultationPage() {
  return (
    <div className="mx-auto pt-6 pb-12 max-w-160 space-y-12 sm:py-10">
      {/* Header */}
      <section>
        <h1 className="mb-4 font-sans font-semibold text-[1.375rem] leading-7 tracking-[0.02em]">
          1-on-1 Consultation with Asdita Prasetya
        </h1>

        <div className="mb-8 space-y-4">
          <div>
            <h2 className="mb-2 font-sans font-semibold text-md text-primary">Asdita Prasetya</h2>
            <p className="text-md leading-[1.75] text-tertiary">
              Full-stack Developer & Coding Mentor
            </p>
            <p className="mt-2 text-sm leading-[1.75] text-tertiary">
              10+ years of experience in the tech industry. Currently working remotely and teaching at several coding platforms.
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
          {scheduleSlots.map((slot) => (
            <p key={slot.time} className="text-md leading-[1.75] text-tertiary">
              {slot.time}
            </p>
          ))}
        </div>
        <p className="mt-4 text-sm leading-[1.75] text-tertiary">
          Format: Video or voice call via Google Meet (you choose what&apos;s comfortable)
        </p>
      </section>

      {/* Preparation */}
      <section>
        <h2 className="mb-4 font-sans font-semibold text-md text-primary">Preparation Before Session</h2>
        <ul className="space-y-2">
          {preparationItems.map((item, index) => (
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
          <h2 className="mb-2 font-sans font-semibold text-md text-primary">Ready for consultation?</h2>
          <p className="mb-6 text-sm text-tertiary">
            Use promo code KONSULTASI during registration
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
