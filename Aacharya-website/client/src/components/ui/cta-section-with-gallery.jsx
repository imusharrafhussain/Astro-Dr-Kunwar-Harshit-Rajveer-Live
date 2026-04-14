/**
 * CTA + masonry-style image grid (Framer Motion).
 * Vite + JSX port of cta-section-with-gallery (no shadcn CLI required).
 */
import * as React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 100,
  damping: 16,
  mass: 0.75,
}

const filterVariants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
  },
}

const areaClasses = [
  'col-start-2 col-end-3 row-start-1 row-end-3',
  'col-start-1 col-end-2 row-start-2 row-end-4',
  'col-start-1 col-end-2 row-start-4 row-end-6',
  'col-start-2 col-end-3 row-start-3 row-end-5',
]

export const ContainerStagger = React.forwardRef(({ transition: tProp, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: tProp?.staggerChildren ?? 0.18,
          delayChildren: tProp?.delayChildren ?? 0.12,
        },
      },
    }}
    {...props}
  />
))
ContainerStagger.displayName = 'ContainerStagger'

export const ContainerAnimated = React.forwardRef(({ transition, ...props }, ref) => (
  <motion.div
    ref={ref}
    variants={filterVariants}
    transition={{
      ...SPRING_TRANSITION,
      ...transition,
    }}
    {...props}
  />
))
ContainerAnimated.displayName = 'ContainerAnimated'

export const GalleryGrid = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'grid grid-cols-2 grid-rows-[52px_148px_52px_148px_52px] gap-2.5 sm:grid-rows-[60px_172px_60px_172px_60px] sm:gap-3.5 min-h-[300px] sm:min-h-[380px] md:min-h-[420px]',
      className,
    )}
    {...props}
  />
))
GalleryGrid.displayName = 'GalleryGrid'

export const GalleryGridCell = React.forwardRef(
  ({ className, index, transition: _t, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-24px' }}
      transition={{
        duration: 0.45,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl shadow-lg shadow-[#5D1916]/[0.08] ring-1 ring-[#5D1916]/[0.06] transition-shadow duration-300 hover:shadow-xl hover:shadow-[#5D1916]/[0.12] hover:ring-[#D4AF37]/25',
        areaClasses[index],
        className,
      )}
      {...props}
    />
  ),
)
GalleryGridCell.displayName = 'GalleryGridCell'

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2338&auto=format&fit=crop',
    alt: 'Quiet study space with warm light',
  },
  {
    src: 'https://images.unsplash.com/photo-1733680958774-39a0e8a64a54?q=80&w=2487&auto=format&fit=crop',
    alt: 'Hands holding an open book',
  },
  {
    src: 'https://images.unsplash.com/photo-1548783307-f63adc3f200b?q=80&w=2487&auto=format&fit=crop',
    alt: 'Temple architecture and sky',
  },
  {
    src: 'https://images.unsplash.com/photo-1703622377707-29bc9409aaf2?q=80&w=2400&auto=format&fit=crop',
    alt: 'Calm interior with natural light',
  },
]

/**
 * About page hero: copy left, animated gallery right.
 */
export function AboutCTAGalleryHero() {
  return (
    <section
      className="about-cta-gallery-hero relative overflow-hidden"
      aria-labelledby="about-cta-gallery-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FFF9F0] via-white to-[#FAFAFA]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 90% 50% at 0% 0%, rgba(212, 175, 55, 0.14) 0%, transparent 55%),
            radial-gradient(ellipse 70% 45% at 100% 100%, rgba(93, 25, 22, 0.07) 0%, transparent 50%),
            radial-gradient(circle at 50% 120%, rgba(212, 175, 55, 0.06) 0%, transparent 45%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.09) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-[min(70vh,520px)] w-[min(70vw,420px)] -translate-y-1/2 rounded-full bg-gradient-to-br from-[#D4AF37]/[0.11] via-transparent to-transparent blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/55 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[min(68vh,720px)] w-full max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 md:grid-cols-2 md:gap-12 lg:gap-16">
          <ContainerStagger className="rounded-2xl border border-[#D4AF37]/[0.14] bg-gradient-to-br from-white/95 via-white/80 to-[#FFFCF7]/90 p-6 shadow-[0_24px_70px_-28px_rgba(93,25,22,0.14),0_0_0_1px_rgba(255,255,255,0.8)_inset] backdrop-blur-md sm:rounded-3xl sm:p-8 md:p-9 md:pr-9 lg:pr-10">
            <ContainerAnimated className="mb-5 block">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[#D4AF37]/35 bg-white/95 px-3.5 py-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#5D1916] shadow-[0_6px_24px_rgba(93,25,22,0.05)] backdrop-blur-sm sm:px-4 sm:py-2.5 sm:text-[0.68rem]">
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#F2C94C] to-[#AA8C2C] shadow-[0_0_10px_rgba(212,175,55,0.45)]"
                  aria-hidden
                />
                Vedic Astrology · Since 2008
              </span>
            </ContainerAnimated>

            <ContainerAnimated className="mb-3 block h-1 w-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#5D1916]/25 sm:w-14" aria-hidden />

            <ContainerAnimated className="block">
              <h1
                id="about-cta-gallery-title"
                className="text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-[#5D1916] sm:text-[2.35rem] md:text-[2.75rem] md:leading-[1.08]"
                style={{ fontFamily: 'var(--font-heading, Cinzel, serif)' }}
              >
                Our{' '}
                <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#AA8C2C] bg-clip-text text-transparent">
                  Story
                </span>
              </h1>
              <p
                className="mt-2.5 max-w-md border-l-2 border-[#D4AF37]/45 pl-3.5 text-[0.72rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-[#5D1916]/50 sm:pl-4 sm:text-[0.78rem] md:text-[0.8rem]"
                style={{ fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)' }}
              >
                Tradition &amp; today
              </p>
            </ContainerAnimated>

            <ContainerAnimated className="my-5 max-w-xl text-[1.03rem] leading-[1.72] text-[#454545] sm:my-6 md:text-[1.06rem] md:leading-[1.75]">
              Bridging ancient Vedic wisdom with modern seekers — disciplined study, compassionate guidance, and readings
              shaped by scripture, not templates.
            </ContainerAnimated>

            <ContainerAnimated className="mb-7 flex flex-wrap gap-2 sm:mb-8 sm:gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#5D1916]/[0.1] bg-white/85 px-3 py-2 text-xs font-medium text-[#5D1916]/85 shadow-sm">
                <span className="text-[#D4AF37]" aria-hidden>
                  ✦
                </span>
                Classical lineages
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#5D1916]/[0.1] bg-white/85 px-3 py-2 text-xs font-medium text-[#5D1916]/85 shadow-sm">
                <span className="text-[#D4AF37]" aria-hidden>
                  ✦
                </span>
                Human-led consultations
              </span>
            </ContainerAnimated>

            <ContainerAnimated className="flex flex-wrap gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-xl px-6 shadow-[0_10px_28px_-8px_rgba(93,25,22,0.35)] transition-transform hover:-translate-y-0.5"
              >
                <Link to="/book" className="gap-2">
                  Book a consultation
                  <FiArrowRight className="text-lg opacity-90" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-[#5D1916]/18 bg-white/80 px-6 backdrop-blur-sm transition-all hover:border-[#D4AF37]/45 hover:bg-[#FFFBF5]"
              >
                <Link to="/contact">Contact us</Link>
              </Button>
            </ContainerAnimated>
          </ContainerStagger>

          <div className="relative mx-auto w-full max-w-[420px] md:mx-0 md:max-w-none">
            <p
              className="mb-3 text-center text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#5D1916]/40 md:text-left"
              style={{ fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)' }}
            >
              A glimpse of the path
            </p>
            <div
              className="pointer-events-none absolute -inset-4 rounded-[1.45rem] bg-gradient-to-br from-[#D4AF37]/22 via-[#FFF5E6]/30 to-[#5D1916]/10 opacity-95 blur-2xl"
              aria-hidden
            />
            <div className="relative rounded-[1.25rem] bg-gradient-to-br from-white via-[#FFFCF7] to-[#FFF5E6]/85 p-[3px] shadow-[0_32px_80px_-24px_rgba(93,25,22,0.24)] ring-1 ring-[#5D1916]/[0.06]">
              <div className="rounded-[1.1rem] bg-gradient-to-b from-white/50 to-[#FFFBF5]/40 p-2 backdrop-blur-[3px] sm:p-2.5">
                <GalleryGrid className="w-full rounded-[0.85rem]">
                  {GALLERY_IMAGES.map(({ src, alt }, index) => (
                    <GalleryGridCell index={index} key={src}>
                      <img
                        className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                        src={src}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#5D1916]/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden
                      />
                    </GalleryGridCell>
                  ))}
                </GalleryGrid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
x