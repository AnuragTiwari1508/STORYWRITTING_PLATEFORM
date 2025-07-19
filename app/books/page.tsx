import { Header } from "@/components/layout/header"
import { BooksGrid } from "@/components/books/books-grid"
import { BooksFilter } from "@/components/books/books-filter"
import { AdBanner } from "@/components/ads/ad-banner"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Books - StoryVerse",
  description: "Discover and read amazing books from talented authors around the world",
  keywords: "books, reading, literature, novels, ebooks, pdf books",
}

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Books</h1>
          <p className="text-muted-foreground">Explore our collection of amazing books from talented authors</p>
        </div>

        <AdBanner position="top" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <BooksFilter />
            <AdBanner position="sidebar" className="mt-6" />
          </div>
          <div className="lg:col-span-3">
            <BooksGrid />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
