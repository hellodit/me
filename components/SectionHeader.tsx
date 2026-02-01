export function SectionHeader({ heading, text }: { heading: string; text?: string }) {
  return (
    <div className="mb-4">
      <h2 className="font-sans font-medium text-sm text-black tracking-[0.02em] uppercase sm:text-md">
        {heading}
      </h2>
      {text && <p className="mt-2 text-sm sm:text-md">{text}</p>}
    </div>
  )
}
