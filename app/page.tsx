import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedItems } from "@/components/featured-items"
import { CategoriesSection } from "@/components/categories-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <FeaturedItems />
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  )
}
