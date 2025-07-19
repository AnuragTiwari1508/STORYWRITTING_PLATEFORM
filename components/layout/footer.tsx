import Link from "next/link"
import { BookOpen, Twitter, Facebook, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">StoryVerse</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover amazing stories, poems, and books from talented writers around the world.
            </p>
            <div className="flex items-center gap-4">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Mail className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">For Readers</h4>
            <div className="space-y-2 text-sm">
              <Link href="/stories" className="block text-muted-foreground hover:text-primary">
                Browse Stories
              </Link>
              <Link href="/poems" className="block text-muted-foreground hover:text-primary">
                Read Poems
              </Link>
              <Link href="/books" className="block text-muted-foreground hover:text-primary">
                Discover Books
              </Link>
              <Link href="/authors" className="block text-muted-foreground hover:text-primary">
                Find Authors
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">For Writers</h4>
            <div className="space-y-2 text-sm">
              <Link href="/write" className="block text-muted-foreground hover:text-primary">
                Start Writing
              </Link>
              <Link href="/publish" className="block text-muted-foreground hover:text-primary">
                Publish Book
              </Link>
              <Link href="/writer-guide" className="block text-muted-foreground hover:text-primary">
                Writer's Guide
              </Link>
              <Link href="/community" className="block text-muted-foreground hover:text-primary">
                Join Community
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <div className="space-y-2 text-sm">
              <Link href="/help" className="block text-muted-foreground hover:text-primary">
                Help Center
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 StoryVerse. All rights reserved. Made with ❤️ for storytellers.</p>
        </div>
      </div>
    </footer>
  )
}
