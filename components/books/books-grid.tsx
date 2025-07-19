"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Heart, Download, Clock, FileText } from "lucide-react"
import Link from "next/link"

interface Book {
  id: number
  title: string
  author: string
  description: string
  genre: string
  coverImage: string
  pages: number
  fileSize: string
  views: number
  likes: number
  downloads: number
  publishedAt: string
  readTime: string
}

export function BooksGrid() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchBooks()
  }, [page])

  const fetchBooks = async () => {
    try {
      // Mock data - replace with actual API call
      const mockBooks: Book[] = [
        {
          id: 1,
          title: "The Startup Chronicles",
          author: "Alex Kumar",
          description:
            "A comprehensive guide to building a successful startup in the digital age. Learn from real experiences and practical insights.",
          genre: "Business",
          coverImage: "/placeholder.svg?height=300&width=200&text=Startup+Chronicles",
          pages: 250,
          fileSize: "2.5 MB",
          views: 2100,
          likes: 345,
          downloads: 156,
          publishedAt: "2024-01-10T10:00:00Z",
          readTime: "4-5 hours",
        },
        {
          id: 2,
          title: "Himalayan Haikus",
          author: "Maya Sharma",
          description:
            "A beautiful collection of haikus inspired by the majestic Himalayas. Each poem captures the essence of mountain life.",
          genre: "Poetry",
          coverImage: "/placeholder.svg?height=300&width=200&text=Himalayan+Haikus",
          pages: 120,
          fileSize: "1.2 MB",
          views: 1500,
          likes: 234,
          downloads: 89,
          publishedAt: "2024-01-08T15:30:00Z",
          readTime: "2-3 hours",
        },
        {
          id: 3,
          title: "Digital Nomad's Guide",
          author: "Priya Singh",
          description:
            "Everything you need to know about working remotely while traveling the world. Tips, tools, and real experiences.",
          genre: "Lifestyle",
          coverImage: "/placeholder.svg?height=300&width=200&text=Digital+Nomad",
          pages: 180,
          fileSize: "3.1 MB",
          views: 1876,
          likes: 298,
          downloads: 134,
          publishedAt: "2024-01-05T09:15:00Z",
          readTime: "3-4 hours",
        },
        {
          id: 4,
          title: "The Future of AI",
          author: "Dr. Raj Patel",
          description:
            "An in-depth exploration of artificial intelligence and its impact on society, business, and human life.",
          genre: "Technology",
          coverImage: "/placeholder.svg?height=300&width=200&text=Future+of+AI",
          pages: 320,
          fileSize: "4.2 MB",
          views: 3245,
          likes: 567,
          downloads: 234,
          publishedAt: "2024-01-03T14:20:00Z",
          readTime: "6-7 hours",
        },
        {
          id: 5,
          title: "Mumbai Stories",
          author: "Vikram Mehta",
          description:
            "A collection of short stories set in the bustling city of Mumbai. Each story captures the spirit of the city.",
          genre: "Fiction",
          coverImage: "/placeholder.svg?height=300&width=200&text=Mumbai+Stories",
          pages: 200,
          fileSize: "2.8 MB",
          views: 1654,
          likes: 189,
          downloads: 78,
          publishedAt: "2024-01-01T12:00:00Z",
          readTime: "4 hours",
        },
        {
          id: 6,
          title: "Cooking with Love",
          author: "Neha Gupta",
          description:
            "Traditional Indian recipes with a modern twist. Perfect for home cooks who want to explore authentic flavors.",
          genre: "Cooking",
          coverImage: "/placeholder.svg?height=300&width=200&text=Cooking+Love",
          pages: 150,
          fileSize: "5.6 MB",
          views: 2987,
          likes: 445,
          downloads: 298,
          publishedAt: "2023-12-28T16:45:00Z",
          readTime: "3 hours",
        },
      ]

      setBooks(mockBooks)
    } catch (error) {
      console.error("Failed to fetch books:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-[3/4] bg-muted rounded-t-lg" />
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
        {books.map((book) => (
          <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="aspect-[3/4] relative overflow-hidden bg-muted">
              <img
                src={book.coverImage || "/placeholder.svg"}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2">
                <Badge variant="secondary">{book.genre}</Badge>
              </div>
              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {book.pages} pages
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="line-clamp-2 text-lg leading-tight">{book.title}</CardTitle>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{book.description}</p>

              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {book.fileSize}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {book.readTime}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {book.views.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {book.downloads}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {book.likes}
                </span>
                <span>{formatDate(book.publishedAt)}</span>
              </div>

              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href={`/book/${book.id}`}>Read Online</Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={() => setPage(page + 1)} className="px-8">
          Load More Books
        </Button>
      </div>
    </div>
  )
}
