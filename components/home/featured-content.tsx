import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Eye, MessageCircle } from "lucide-react"
import Link from "next/link"

const featuredStories = [
  {
    id: 1,
    title: "The Last Library",
    author: "Sarah Chen",
    excerpt:
      "In a world where books are forbidden, one librarian fights to preserve the last collection of human knowledge...",
    genre: "Sci-Fi",
    likes: 1234,
    views: 5678,
    comments: 89,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Midnight in Mumbai",
    author: "Raj Patel",
    excerpt:
      "A love story that unfolds through the bustling streets of Mumbai, where two souls find each other in the chaos...",
    genre: "Romance",
    likes: 987,
    views: 3456,
    comments: 67,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "The Poet's Garden",
    author: "Maya Sharma",
    excerpt: "A collection of poems inspired by nature, love, and the human experience...",
    genre: "Poetry",
    likes: 756,
    views: 2345,
    comments: 45,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function FeaturedContent() {
  return (
    <section className="py-16 px-4">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Stories & Poems</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked by our editors - the best stories and poems from our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStories.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img src={story.image || "/placeholder.svg"} alt={story.title} className="w-full h-full object-cover" />
                <Badge className="absolute top-2 left-2">{story.genre}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{story.title}</CardTitle>
                <p className="text-sm text-muted-foreground">by {story.author}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{story.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {story.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {story.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {story.comments}
                    </span>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/story/${story.id}`}>Read Story</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/stories">View All Stories</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
