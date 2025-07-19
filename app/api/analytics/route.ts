import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const authorId = searchParams.get("authorId")

  if (!authorId) {
    return NextResponse.json({ error: "Author ID is required" }, { status: 400 })
  }

  // Mock analytics data - replace with actual database queries
  const analytics = {
    totalViews: 15234,
    totalLikes: 2891,
    totalComments: 456,
    totalFollowers: 789,
    recentStories: [
      { title: "The Digital Nomad", views: 1234, likes: 89, comments: 12 },
      { title: "Monsoon Memories", views: 987, likes: 67, comments: 8 },
      { title: "City of Dreams", views: 756, likes: 45, comments: 6 },
    ],
    monthlyViews: [
      { month: "Jan", views: 2000 },
      { month: "Feb", views: 2500 },
      { month: "Mar", views: 3000 },
      { month: "Apr", views: 2800 },
      { month: "May", views: 3200 },
      { month: "Jun", views: 3500 },
    ],
  }

  return NextResponse.json(analytics)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, contentId, userId } = body

    // Track analytics event (view, like, comment, etc.)
    // In a real app, this would update analytics tables

    const eventData = {
      type,
      contentId,
      userId,
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || "unknown",
    }

    // Mock response - in real app, save to database
    return NextResponse.json({ success: true, eventData })
  } catch (error) {
    console.error("Analytics tracking error:", error)
    return NextResponse.json({ error: "Failed to track analytics" }, { status: 500 })
  }
}
