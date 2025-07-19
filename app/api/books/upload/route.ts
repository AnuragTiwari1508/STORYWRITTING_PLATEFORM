import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const bookFile = formData.get("bookFile") as File
    const coverImage = formData.get("coverImage") as File
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const authorId = formData.get("authorId") as string

    if (!bookFile || !title || !authorId) {
      return NextResponse.json({ error: "Book file, title, and author ID are required" }, { status: 400 })
    }

    // Validate file type
    if (bookFile.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
    }

    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024 // 50MB in bytes
    if (bookFile.size > maxSize) {
      return NextResponse.json({ error: "File size must be less than 50MB" }, { status: 400 })
    }

    // In a real app, upload files to cloud storage (AWS S3, etc.)
    // For now, we'll simulate the upload
    const bookUrl = `/uploads/books/${Date.now()}-${bookFile.name}`
    const coverUrl = coverImage ? `/uploads/covers/${Date.now()}-${coverImage.name}` : null

    // Save book metadata to database
    const newBook = {
      id: Date.now(),
      title,
      description,
      authorId: Number.parseInt(authorId),
      fileUrl: bookUrl,
      coverImageUrl: coverUrl,
      fileSize: bookFile.size,
      pages: 0, // Would be extracted from PDF
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(newBook, { status: 201 })
  } catch (error) {
    console.error("Book upload error:", error)
    return NextResponse.json({ error: "Failed to upload book" }, { status: 500 })
  }
}
