"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, BookOpen, PenTool, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/providers/auth-provider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StoryVerse</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/stories" className="text-sm font-medium hover:text-primary">
              Stories
            </Link>
            <Link href="/poems" className="text-sm font-medium hover:text-primary">
              Poems
            </Link>
            <Link href="/books" className="text-sm font-medium hover:text-primary">
              Books
            </Link>
            <Link href="/authors" className="text-sm font-medium hover:text-primary">
              Authors
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stories, poems, books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/write">
                  <PenTool className="h-4 w-4 mr-2" />
                  Write
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <Button onClick={logout} variant="ghost" size="sm">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-background p-4">
          <nav className="flex flex-col gap-4">
            <Link href="/stories" className="text-sm font-medium">
              Stories
            </Link>
            <Link href="/poems" className="text-sm font-medium">
              Poems
            </Link>
            <Link href="/books" className="text-sm font-medium">
              Books
            </Link>
            <Link href="/authors" className="text-sm font-medium">
              Authors
            </Link>
            <div className="flex items-center gap-2 mt-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="flex-1" />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
