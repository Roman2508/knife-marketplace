'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative mx-auto max-w-[95rem] px-8 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div className="flex flex-col justify-center space-y-8">
            <div className="inline-flex w-fit items-center gap-2 border-4 border-foreground bg-accent px-4 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
              <Star className="h-4 w-4 fill-foreground" />
              <span className="text-xs font-black uppercase tracking-wider">Curated Marketplace</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-black uppercase tracking-tighter leading-[0.85]">
                <span className="block text-6xl sm:text-7xl lg:text-8xl">ПРЕМІУМ</span>
                <span className="block border-8 border-foreground bg-primary px-4 py-2 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-primary-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] my-2">
                  НОЖІ
                </span>
                {/* <span className="block text-6xl sm:text-7xl lg:text-8xl">&</span>
                <span className="block border-8 border-foreground bg-accent px-4 py-2 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] my-2">
                  ГОДИННИКИ
                </span> */}
              </h1>

              {/* <p className="max-w-lg border-l-8 border-foreground pl-6 text-lg font-bold uppercase tracking-wide">
                Verified. Authentic. Premium Quality Collectibles
              </p> */}
              <p className="border-l-8 border-foreground mt-8 pl-6 text-lg font-bold uppercase tracking-wide">
                Магазин не продає зброю. Ми пропонуємо колекційні ножі та годинники від провідних брендів.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-16 border-4 border-foreground bg-primary px-10 text-base font-black uppercase tracking-wider text-primary-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]"
              >
                <Link href="/browse">
                  ПЕРЕГЛЯНУТИ ПРОПОЗИЦІЇ
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-16 border-4 !border-foreground bg-background px-10 text-base font-black uppercase tracking-wider shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:text-foreground hover:-translate-x-1 hover:-translate-y-1 hover:bg-accent hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]"
              >
                <Link href="/register">ПОЧАТИ ПРОДАЖ</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="border-4 border-foreground bg-background p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                <div className="text-3xl font-black uppercase">10K+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Users</div>
              </div>
              <div className="border-4 border-foreground bg-primary p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                <div className="text-3xl font-black uppercase text-primary-foreground">100%</div>
                <div className="text-xs font-bold uppercase tracking-wider text-primary-foreground/80">Verified</div>
              </div>
              <div className="border-4 border-foreground bg-accent p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                <div className="text-3xl font-black uppercase">24H</div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Review</div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="space-y-4">
              {/* aspect-[4/3] */}
              <div className="group relative aspect-[4/2.5] overflow-hidden border-4 border-foreground bg-card shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[18px_18px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[18px_18px_0px_0px_rgba(255,255,255,1)]">
                <img
                  src="/luxury-knife-collection-display.jpg"
                  alt="Featured knife"
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 border-t-4 border-foreground bg-primary p-4">
                  <div className="text-xl font-black uppercase text-primary-foreground">Featured Collection</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group relative aspect-square overflow-hidden border-4 border-foreground bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
                  <img src="/luxury-watch-closeup.jpg" alt="Featured watch" className="h-full w-full object-cover" />
                </div>

                <div className="group relative aspect-square overflow-hidden border-4 border-foreground bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
                  <img src="/premium-folding-knife.jpg" alt="Featured item" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 border-4 border-foreground bg-accent p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)]">
              <div className="text-4xl font-black uppercase">₴2.4M+</div>
              <div className="text-sm font-bold uppercase tracking-wider">Total Sales</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
