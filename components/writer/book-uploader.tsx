"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, ImageIcon } from "lucide-react"

export function BookUploader() {
  const [bookFile, setBookFile] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [bookTitle, setBookTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "book" | "cover") => {
    const file = event.target.files?.[0]
    if (file) {
      if (type === "book") {
        setBookFile(file)
      } else {
        setCoverImage(file)
      }
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Your Book
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="book-title">Book Title</Label>
            <Input
              id="book-title"
              placeholder="Enter book title..."
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Write a brief description of your book..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Book File (PDF)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {bookFile ? bookFile.name : "Upload your book (PDF format)"}
                  </p>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, "book")}
                    className="hidden"
                    id="book-upload"
                  />
                  <Label htmlFor="book-upload" className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>Choose File</span>
                    </Button>
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{coverImage ? coverImage.name : "Upload book cover"}</p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "cover")}
                    className="hidden"
                    id="cover-upload"
                  />
                  <Label htmlFor="cover-upload" className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>Choose Image</span>
                    </Button>
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Upload Guidelines:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Book file must be in PDF format</li>
              <li>• Maximum file size: 50MB</li>
              <li>• Cover image should be at least 600x800 pixels</li>
              <li>• Supported image formats: JPG, PNG, WebP</li>
            </ul>
          </div>

          <Button className="w-full" disabled={!bookFile || !bookTitle}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Book
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
