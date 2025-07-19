"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Heart, Clock } from "lucide-react"
import Link from "next/link"

interface RelatedStory {
  id: number
  title: string
  author: string
  excerpt: string
  genre: string
  readTime: number
  views: number
  likes: number
  publishedAt: string
}

interface RelatedStoriesProps {
  currentStoryId: number
  genre: string
}

export function RelatedStories({ currentStoryId, genre }: RelatedStoriesProps) {
  const [stories, setStories] = useState<RelatedStory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRelatedStories()
  }, [currentStoryId, genre])

  const fetchRelatedStories = async () => {
    try {
      // Mock data - replace with actual API call
      const mockStories: RelatedStory[] = [
        {
          id: 2,
          title: "The Memory Thief",
          author: "Alex Chen",
          excerpt:
            "In a world where memories can be stolen, one detective must solve a case using only fragments of the past...",
          genre: "Sci-Fi",
          readTime: 12,
          views: 3456,
          likes: 789,
          publishedAt: "2024-01-14T10:00:00Z",
        },
        {
          id: 3,
          title: "Digital Ghosts",
          author: "Maya Patel",
          excerpt:
            "When AI consciousness begins to haunt the internet, a programmer discovers the truth about digital afterlife...",
          genre: "Sci-Fi",
          readTime: 18,
          views: 2134,
          likes: 567,
          publishedAt: "2024-01-13T15:30:00Z",
        },
        {
          id: 4,
          title: "The Last Bookstore",
          author: "David Kim",
          excerpt:
            "A small bookstore owner fights against the digital revolution to preserve the magic of physical books...",
          genre: "Sci-Fi",
          readTime: 10,
          views: 1876,
          likes: 432,
          publishedAt: "2024-01-12T09:15:00Z",
        },
      ]

      setStories(mockStories.filter((story) => story.id !== currentStoryId))
    } catch (error) {
      console.error("Failed to fetch related stories:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Related Stories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2 mb-2" />
                <div className="h-3 bg-muted rounded w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Stories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stories.map((story) => (
          <div key={story.id} className="space-y-3 pb-4 border-b border-muted last:border-b-0 last:pb-0">
            <div className="space-y-2">
              <Badge variant="secondary" className="text-xs">
                {story.genre}
              </Badge>

              <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                <Link href={`/story/${story.id}`} className="hover:text-primary transition-colors">
                  {story.title}
                </Link>
              </h3>

              <p className="text-xs text-muted-foreground">by {story.author}</p>

              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{story.excerpt}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {story.readTime}m
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {story.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {story.likes}
                </span>
              </div>
            </div>

            <Button asChild size="sm" variant="outline" className="w-full text-xs h-8 bg-transparent">
              <Link href={`/story/${story.id}`}>Read Story</Link>
            </Button>
          </div>
        ))}

        <Button asChild variant="outline" className="w-full bg-transparent">
          <Link href={`/stories?genre=${genre}`}>View More {genre} Stories</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
