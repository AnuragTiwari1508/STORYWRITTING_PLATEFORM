import { type NextRequest, NextResponse } from "next/server"

// Mock data - replace with actual database queries
const mockStories = [
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
    createdAt: "2024-01-15",
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
    createdAt: "2024-01-14",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const genre = searchParams.get("genre")
  const search = searchParams.get("search")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  // Filter stories based on query parameters
  let filteredStories = mockStories

  if (genre) {
    filteredStories = filteredStories.filter((story) => story.genre.toLowerCase() === genre.toLowerCase())
  }

  if (search) {
    filteredStories = filteredStories.filter(
      (story) =>
        story.title.toLowerCase().includes(search.toLowerCase()) ||
        story.author.toLowerCase().includes(search.toLowerCase()),
    )
  }

  // Pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedStories = filteredStories.slice(startIndex, endIndex)

  return NextResponse.json({
    stories: paginatedStories,
    total: filteredStories.length,
    page,
    totalPages: Math.ceil(filteredStories.length / limit),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, genre, tags, authorId } = body

    // Validate required fields
    if (!title || !content || !authorId) {
      return NextResponse.json({ error: "Title, content, and author ID are required" }, { status: 400 })
    }

    // In a real app, save to database
    const newStory = {
      id: Date.now(),
      title,
      content,
      genre,
      tags,
      authorId,
      likes: 0,
      views: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newStory, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 })
  }
}
