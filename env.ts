import { vercel } from '@t3-oss/env-core/presets-zod'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_ENV: z
      .enum(['production', 'preview', 'development'])
      .default('development'),
    NEXT_PUBLIC_BASE_URL: z.string().url().default('http://localhost:3000'),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional().default(''),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional().default('https://eu.i.posthog.com'),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },
  extends: [vercel()],
})
