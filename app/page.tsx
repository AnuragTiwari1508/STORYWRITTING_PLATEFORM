import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedContent } from "@/components/home/featured-content"
import { TrendingSection } from "@/components/home/trending-section"
import { AdBanner } from "@/components/ads/ad-banner"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AdBanner position="top" />
        <FeaturedContent />
        <TrendingSection />
        <AdBanner position="middle" />
      </main>
      <Footer />
    </div>
  )
}
