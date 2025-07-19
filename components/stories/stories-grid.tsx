"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Eye, MessageCircle, Clock } from "lucide-react"
import Link from "next/link"

interface Story {
  id: number
  title: string
  author: string
  excerpt: string
  genre: string
  likes: number
  views: number
  comments: number
  createdAt: string
}

export function StoriesGrid() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchStories()
  }, [page])

  const fetchStories = async () => {
    try {
      const response = await fetch(`/api/stories?page=${page}&limit=12`)
      const data = await response.json()
      setStories(data.stories)
    } catch (error) {
      console.error("Failed to fetch stories:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-32 bg-muted rounded-t-lg" />
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded" />
                <div className="h-3 bg-muted rounded" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Card key={story.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <div className="text-center p-4">
                <Badge className="mb-2">{story.genre}</Badge>
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" />
                  {Math.ceil(story.excerpt.length / 200)} min read
                </div>
              </div>
            </div>

            <CardHeader>
              <CardTitle className="line-clamp-2 text-lg">{story.title}</CardTitle>
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

      <div className="flex justify-center">
        <Button variant="outline" onClick={() => setPage(page + 1)} className="px-8">
          Load More Stories
        </Button>
      </div>
    </div>
  )
}
