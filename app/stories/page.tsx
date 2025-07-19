import { Header } from "@/components/layout/header"
import { StoriesGrid } from "@/components/stories/stories-grid"
import { StoriesFilter } from "@/components/stories/stories-filter"
import { AdBanner } from "@/components/ads/ad-banner"
import { Footer } from "@/components/layout/footer"

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Stories</h1>
          <p className="text-muted-foreground">Explore thousands of amazing stories from talented writers</p>
        </div>

        <AdBanner position="top" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <StoriesFilter />
            <AdBanner position="sidebar" className="mt-6" />
          </div>
          <div className="lg:col-span-3">
            <StoriesGrid />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
