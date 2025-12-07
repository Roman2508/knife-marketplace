"use client";

import Link from "next/link";
import {
  PocketKnife as Knife,
  Watch,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function CategoriesSection() {
  return (
    <section className="relative overflow-hidden border-y-8 border-foreground bg-muted py-24">
      {/* Background geometric shapes */}
      <div className="absolute left-1/4 top-0 h-full w-2 bg-primary/10"></div>
      <div className="absolute right-1/3 top-0 h-full w-1 bg-accent/10"></div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Experimental section title */}
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-3 border-4 border-foreground bg-background px-6 py-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-sm font-black uppercase tracking-[0.3em]">
              КАТЕГОРІЇ
            </span>
          </div>

          <h2 className="font-black uppercase leading-none tracking-tighter">
            <span className="block text-5xl sm:text-7xl">КУПУЙТЕ ЗА</span>
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-5xl text-transparent sm:text-7xl">
              КАТЕГОРІЄЮ
            </span>
          </h2>
        </div>

        {/* Asymmetric category cards */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* Knife Category - Left aligned, rotated */}
          <Link href="/browse?category=knife" className="group">
            <div className="relative overflow-hidden border-4 border-foreground bg-background p-12 transition-all duration-500 hover:border-primary hover:shadow-[12px_12px_0px_0px_rgba(var(--primary-rgb),0.5)] hover:-rotate-1">
              {/* Large background icon */}
              <div className="absolute -right-12 -top-12 opacity-5">
                <Knife className="h-64 w-64 text-primary" />
              </div>

              <div className="relative">
                {/* Icon box */}
                <div className="mb-8 inline-flex border-4 border-foreground bg-primary p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <Knife className="h-16 w-16 text-background" />
                </div>

                {/* Content */}
                <div className="mb-6 border-l-4 border-primary pl-6">
                  <h3 className="mb-3 text-5xl font-black uppercase tracking-tighter">
                    НОЖІ
                  </h3>
                  <p className="text-base font-bold leading-relaxed text-muted-foreground">
                    Від повсякденного носіння до колекційних екземплярів.
                    Тактичні складані ножі, індивідуальні збірки.
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3 border-t-2 border-dashed border-foreground/20 pt-6">
                  <div className="h-2 w-2 bg-primary"></div>
                  <span className="text-lg font-black uppercase tracking-wider text-primary">
                    ПЕРЕГЛЯНУТИ
                  </span>
                  <ArrowRight className="h-6 w-6 text-primary transition-transform group-hover:translate-x-3" />
                </div>
              </div>
            </div>
          </Link>

          {/* Watch Category - Right aligned, different angle */}
          <Link href="/browse?category=watch" className="group">
            <div className="relative overflow-hidden border-4 border-foreground bg-background p-12 transition-all duration-500 hover:border-accent hover:shadow-[12px_12px_0px_0px_rgba(var(--accent-rgb),0.5)] hover:rotate-1">
              {/* Large background icon */}
              <div className="absolute -left-12 -bottom-12 opacity-5">
                <Watch className="h-64 w-64 text-accent" />
              </div>

              <div className="relative">
                {/* Icon box */}
                <div className="mb-8 inline-flex border-4 border-foreground bg-accent p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <Watch className="h-16 w-16 text-background" />
                </div>

                {/* Content */}
                <div className="mb-6 border-l-4 border-accent pl-6">
                  <h3 className="mb-3 text-5xl font-black uppercase tracking-tighter">
                    ГОДИННИКИ
                  </h3>
                  <p className="text-base font-bold leading-relaxed text-muted-foreground">
                    Розкішні годинники від відомих будинків моди. Дайверські
                    годинники, класичні годинники, обмежені серії.
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3 border-t-2 border-dashed border-foreground/20 pt-6">
                  <div className="h-2 w-2 bg-accent"></div>
                  <span className="text-lg font-black uppercase tracking-wider text-accent">
                    ПЕРЕГЛЯНУТИ
                  </span>
                  <ArrowRight className="h-6 w-6 text-accent transition-transform group-hover:translate-x-3" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
