import { ServiceCard } from '@/components/ServiceCard'
import { getAllServices } from '@/utils/mdx'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service - Asdita Prasetya',
  description: 'Digital products and services by Asdita Prasetya',
  alternates: {
    canonical: '/services',
  },
}

export default function ServicePage() {
  const services = getAllServices()

  return (
    <div className="pt-6 pb-12 space-y-12 sm:py-10">
      <section>
        <h1 className="mb-4 font-sans font-semibold text-[1.375rem] leading-7 tracking-[0.02em] sm:text-xl">
          Produk Digital
        </h1>

        <p className="mb-6 text-sm leading-[1.75] text-tertiary sm:mb-8 sm:text-md">
          Koleksi produk digital berkualitas untuk membantu perjalanan coding Anda:
        </p>

        {services.length === 0 ? (
          <p className="text-sm leading-[1.75] text-tertiary sm:text-md">
            Tidak ada produk tersedia saat ini.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:gap-4 sm:grid-cols-2 items-stretch">
            {services.map((service) => {
              if (!service) return null
              return (
                <li key={service.slug} className="flex w-full h-full">
                  <ServiceCard
                    title={service.frontmatter.title}
                    thumbnail={service.frontmatter.thumbnail}
                    price={service.frontmatter.price}
                    originalPrice={service.frontmatter.originalPrice}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
