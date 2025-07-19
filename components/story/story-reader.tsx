"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Heart, Bookmark, Share2, Eye, Clock, MessageCircle, UserPlus, Flag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ShareDialog } from "./share-dialog"
import { ReportDialog } from "./report-dialog"

interface Story {
  id: number
  title: string
  content: string
  author: {
    id: number
    name: string
    avatar: string
    bio: string
    followers: number
    stories: number
  }
  genre: string
  tags: string[]
  publishedAt: string
  readTime: number
  views: number
  likes: number
  comments: number
  bookmarks: number
  isLiked: boolean
  isBookmarked: boolean
  isFollowing: boolean
}

interface StoryReaderProps {
  story: Story
}

export function StoryReader({ story }: StoryReaderProps) {
  const [isLiked, setIsLiked] = useState(story.isLiked)
  const [isBookmarked, setIsBookmarked] = useState(story.isBookmarked)
  const [isFollowing, setIsFollowing] = useState(story.isFollowing)
  const [likes, setLikes] = useState(story.likes)
  const [bookmarks, setBookmarks] = useState(story.bookmarks)
  const [followers, setFollowers] = useState(story.author.followers)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const { toast } = useToast()

  const handleLike = async () => {
    try {
      setIsLiked(!isLiked)
      setLikes(isLiked ? likes - 1 : likes + 1)

      // API call would go here
      toast({
        title: isLiked ? "Removed from likes" : "Added to likes",
        description: isLiked ? "Story removed from your likes" : "Story added to your likes",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive",
      })
    }
  }

  const handleBookmark = async () => {
    try {
      setIsBookmarked(!isBookmarked)
      setBookmarks(isBookmarked ? bookmarks - 1 : bookmarks + 1)

      toast({
        title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
        description: isBookmarked ? "Story removed from your bookmarks" : "Story saved to your bookmarks",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bookmark status",
        variant: "destructive",
      })
    }
  }

  const handleFollow = async () => {
    try {
      setIsFollowing(!isFollowing)
      setFollowers(isFollowing ? followers - 1 : followers + 1)

      toast({
        title: isFollowing ? "Unfollowed" : "Following",
        description: isFollowing ? `You unfollowed ${story.author.name}` : `You are now following ${story.author.name}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update follow status",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <article className="space-y-8">
      {/* Story Header */}
      <header className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{story.genre}</Badge>
            {story.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">{story.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {story.readTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {story.views.toLocaleString()} views
            </span>
            <span>{formatDate(story.publishedAt)}</span>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={story.author.avatar || "/placeholder.svg"} alt={story.author.name} />
              <AvatarFallback>{story.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{story.author.name}</h3>
              <p className="text-sm text-muted-foreground">{story.author.bio}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                <span>{followers.toLocaleString()} followers</span>
                <span>{story.author.stories} stories</span>
              </div>
            </div>
          </div>

          <Button onClick={handleFollow} variant={isFollowing ? "outline" : "default"} size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant={isLiked ? "default" : "outline"} size="sm" onClick={handleLike} className="gap-2">
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {likes.toLocaleString()}
            </Button>

            <Button variant={isBookmarked ? "default" : "outline"} size="sm" onClick={handleBookmark} className="gap-2">
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              {bookmarks.toLocaleString()}
            </Button>

            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <MessageCircle className="h-4 w-4" />
              {story.comments}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowShareDialog(true)}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>

            <Button variant="outline" size="sm" onClick={() => setShowReportDialog(true)}>
              <Flag className="h-4 w-4 mr-2" />
              Report
            </Button>
          </div>
        </div>
      </header>

      <Separator />

      {/* Story Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {story.content.split("\n\n").map((paragraph, index) => (
          <p key={index} className="mb-6 leading-relaxed text-lg">
            {paragraph}
          </p>
        ))}
      </div>

      <Separator />

      {/* Story Footer */}
      <footer className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant={isLiked ? "default" : "outline"} onClick={handleLike} className="gap-2">
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {isLiked ? "Liked" : "Like"}
            </Button>

            <Button variant={isBookmarked ? "default" : "outline"} onClick={handleBookmark} className="gap-2">
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
          </div>

          <Button variant="outline" onClick={() => setShowShareDialog(true)}>
            <Share2 className="h-4 w-4 mr-2" />
            Share this story
          </Button>
        </div>

        {/* Author Card */}
        <div className="p-6 bg-muted/30 rounded-lg">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={story.author.avatar || "/placeholder.svg"} alt={story.author.name} />
              <AvatarFallback>{story.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{story.author.name}</h3>
              <p className="text-muted-foreground mb-4">{story.author.bio}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{followers.toLocaleString()} followers</span>
                  <span>{story.author.stories} stories published</span>
                </div>
                <Button onClick={handleFollow} variant={isFollowing ? "outline" : "default"}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <ShareDialog open={showShareDialog} onOpenChange={setShowShareDialog} story={story} />

      <ReportDialog
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
        contentId={story.id}
        contentType="story"
      />
    </article>
  )
}
