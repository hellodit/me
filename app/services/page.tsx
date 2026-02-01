import { ServiceCard } from '@/components/ServiceCard'
import servicesData from '@/data/services.json'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service - Asdita Prasetya',
  description: 'Digital products and services by Asdita Prasetya',
  alternates: {
    canonical: '/service',
  },
}

export default function ServicePage() {
  const { products } = servicesData

  return (
    <div className="mx-auto pt-6 pb-12 px-4 max-w-160 space-y-12 sm:px-6 sm:py-10 lg:px-8">
      <section>
        <h1 className="mb-4 font-sans font-semibold text-[1.375rem] leading-7 tracking-[0.02em] sm:text-xl">
          Produk Digital
        </h1>

        <p className="mb-6 text-sm leading-[1.75] text-tertiary sm:mb-8 sm:text-md">
          Koleksi produk digital berkualitas untuk membantu perjalanan coding Anda:
        </p>

        {products.length === 0 ? (
          <p className="text-sm leading-[1.75] text-tertiary sm:text-md">
            Tidak ada produk tersedia saat ini.
          </p>
        ) : (
          <ul className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.id} className="flex">
                <ServiceCard
                  title={product.title}
                  thumbnail={product.thumbnail}
                  price={product.price}
                  originalPrice={product.originalPrice}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
