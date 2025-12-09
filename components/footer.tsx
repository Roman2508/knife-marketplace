import Link from "next/link";
import {
  PocketKnife as Knife,
  Watch,
  Mail,
  Github,
  Twitter,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-8 border-foreground bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Logo section with experimental design */}
          <div className="md:col-span-1">
            <Link href="/" className="group inline-block">
              <div className="mb-6 inline-flex items-center gap-3 border-4 border-foreground bg-primary p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1">
                <span className="font-mono text-2xl font-black text-background">
                  E
                </span>
                <span className="text-2xl font-black uppercase tracking-tighter text-background">
                  DGE
                </span>
              </div>
            </Link>
            <p className="border-l-4 border-primary pl-4 text-sm font-bold uppercase leading-relaxed tracking-wide text-muted-foreground">
              Вторинний ринок для колекціонерів
            </p>
          </div>

          {/* Marketplace links */}
          <div>
            <div className="mb-6 inline-flex border-b-4 border-foreground pb-2">
              <h3 className="text-sm font-black uppercase tracking-widest">
                Marketplace
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/browse?category=knife"
                  className="group flex items-center gap-3 font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
                >
                  <div className="h-2 w-2 bg-primary transition-all group-hover:h-3 group-hover:w-3"></div>
                  <Knife className="h-4 w-4" />
                  Knives
                </Link>
              </li>
              <li>
                <Link
                  href="/browse?category=watch"
                  className="group flex items-center gap-3 font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-accent"
                >
                  <div className="h-2 w-2 bg-accent transition-all group-hover:h-3 group-hover:w-3"></div>
                  <Watch className="h-4 w-4" />
                  Watches
                </Link>
              </li>
              <li>
                <Link
                  href="/sell"
                  className="group flex items-center gap-3 font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                >
                  <div className="h-2 w-2 bg-foreground transition-all group-hover:h-3 group-hover:w-3"></div>
                  Sell Item
                </Link>
              </li>
            </ul>
          </div>

          {/* Support links */}
          <div>
            <div className="mb-6 inline-flex border-b-4 border-foreground pb-2">
              <h3 className="text-sm font-black uppercase tracking-widest">
                Support
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="group flex items-center gap-3 font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                >
                  <div className="h-2 w-2 bg-foreground transition-all group-hover:h-3 group-hover:w-3"></div>
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="group flex items-center gap-3 font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                >
                  <div className="h-2 w-2 bg-foreground transition-all group-hover:h-3 group-hover:w-3"></div>
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="group flex items-center gap-3 font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                >
                  <div className="h-2 w-2 bg-foreground transition-all group-hover:h-3 group-hover:w-3"></div>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <div className="mb-6 inline-flex border-b-4 border-foreground pb-2">
              <h3 className="text-sm font-black uppercase tracking-widest">
                Connect
              </h3>
            </div>
            <ul className="mb-6 space-y-3">
              <li>
                <Link
                  href="#"
                  className="group flex items-center gap-3 font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                >
                  <div className="h-2 w-2 bg-foreground transition-all group-hover:h-3 group-hover:w-3"></div>
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="group flex items-center gap-3 font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                >
                  <div className="h-2 w-2 bg-foreground transition-all group-hover:h-3 group-hover:w-3"></div>
                  Privacy
                </Link>
              </li>
            </ul>

            {/* Social icons with brutalist style */}
            <div className="flex gap-3">
              <a
                href="#"
                className="border-3 border-foreground bg-background p-2 transition-all hover:bg-primary hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="border-3 border-foreground bg-background p-2 transition-all hover:bg-accent hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="border-3 border-foreground bg-background p-2 transition-all hover:bg-foreground hover:text-background hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright section with decorative elements */}
        <div className="relative mt-16 border-t-4 border-dashed border-foreground/20 pt-8">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="h-6 w-6 rotate-45 border-4 border-foreground bg-background"></div>
          </div>
          <p className="text-center text-sm font-black uppercase tracking-widest text-muted-foreground">
            &copy; {new Date().getFullYear()} EDGE · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
