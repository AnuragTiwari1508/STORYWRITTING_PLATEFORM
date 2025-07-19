import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, PenTool, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-20 px-4 text-center bg-gradient-to-b from-primary/5 to-background">
      <div className="container max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Discover Stories That Move You
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Read amazing stories, poems, and books from talented writers around the world. Share your own creativity and
          connect with fellow storytellers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/stories">
              <BookOpen className="mr-2 h-5 w-5" />
              Start Reading
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            <Link href="/write">
              <PenTool className="mr-2 h-5 w-5" />
              Start Writing
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">10,000+ Stories</h3>
            <p className="text-sm text-muted-foreground">Discover amazing content across all genres</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <PenTool className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Easy Publishing</h3>
            <p className="text-sm text-muted-foreground">Share your stories with our simple editor</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Active Community</h3>
            <p className="text-sm text-muted-foreground">Connect with readers and writers worldwide</p>
          </div>
        </div>
      </div>
    </section>
  )
}
