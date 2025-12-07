"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { ItemCard } from "@/components/item-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Zap } from "lucide-react";

export function FeaturedItems() {
  const { items } = useAppStore();
  const featuredItems = items
    .filter((item) => item.status === "approved")
    .slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-background py-24">
      {/* Decorative background elements */}
      <div className="absolute left-0 top-20 h-64 w-64 border-8 border-primary/20 -rotate-12"></div>
      <div className="absolute right-0 bottom-20 h-48 w-48 border-8 border-accent/20 rotate-45"></div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Experimental heading with mixed typography */}
        <div className="mb-16">
          <div className="mb-6 flex items-center gap-4">
            <div className="border-4 border-foreground bg-primary p-3">
              <TrendingUp className="h-8 w-8 text-background" />
            </div>
            <div className="h-1 w-32 bg-foreground"></div>
            <span className="text-sm font-black uppercase tracking-[0.3em]">
              В ТРЕНДІ
            </span>
          </div>

          <h2 className="mb-4 font-black leading-none">
            <span className="block uppercase tracking-tighter text-4xl sm:text-6xl lg:text-8xl">
              РЕКОМЕНДОВАНІ
            </span>
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text uppercase italic tracking-tighter text-transparent text-4xl sm:text-6xl lg:text-8xl">
              ПРОПОЗИЦІЇ
            </span>
          </h2>

          <div className="flex items-center gap-4">
            <Zap className="h-6 w-6 text-primary" />
            <p className="max-w-xl text-base sm:text-lg font-bold uppercase tracking-wide text-muted-foreground">
              ПІДБІРКА ПРОПОЗИЦІЙ ВІД ПЕРЕВІРЕНИХ ПРОДАВЦІВ
            </p>
          </div>
        </div>

        {/* Asymmetric grid layout */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item, index) => (
            <div
              key={item.id}
              className={index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
              style={{
                transform:
                  index % 2 === 0 ? "translateY(0)" : "translateY(2rem)",
              }}
            >
              <ItemCard item={item} />
            </div>
          ))}
        </div>

        {/* Brutalist CTA button */}
        <div className="mt-20 flex justify-center">
          <Button
            asChild
            size="lg"
            className="group relative border-4 border-foreground bg-accent px-12 py-8 text-xl font-black uppercase tracking-wider text-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1"
          >
            <Link href="/browse">
              ПЕРЕГЛЯНУТИ ВСІ ПРОПОЗИЦІЇ
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
