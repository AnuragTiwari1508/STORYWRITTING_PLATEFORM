"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, Reply, Flag } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"

interface Comment {
  id: number
  content: string
  author: {
    id: number
    name: string
    avatar: string
  }
  createdAt: string
  likes: number
  isLiked: boolean
  replies: Comment[]
  parentId?: number
}

interface StoryCommentsProps {
  storyId: number
}

export function StoryComments({ storyId }: StoryCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchComments()
  }, [storyId])

  const fetchComments = async () => {
    try {
      // Mock data - replace with actual API call
      const mockComments: Comment[] = [
        {
          id: 1,
          content:
            "Amazing story! The dystopian world-building is incredible. I love how you've portrayed the conflict between digital and physical knowledge.",
          author: {
            id: 2,
            name: "John Reader",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          createdAt: "2024-01-15T14:30:00Z",
          likes: 12,
          isLiked: false,
          replies: [
            {
              id: 3,
              content: "I completely agree! The character development is also top-notch.",
              author: {
                id: 3,
                name: "Emma Wilson",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              createdAt: "2024-01-15T15:45:00Z",
              likes: 5,
              isLiked: true,
              replies: [],
              parentId: 1,
            },
          ],
        },
        {
          id: 2,
          content:
            "This reminds me of Ray Bradbury's Fahrenheit 451. Great work on creating a believable future scenario!",
          author: {
            id: 4,
            name: "Book Lover",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          createdAt: "2024-01-15T16:20:00Z",
          likes: 8,
          isLiked: false,
          replies: [],
        },
      ]
      setComments(mockComments)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      })
    }
  }

  const handleSubmitComment = async () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to comment",
        variant: "destructive",
      })
      return
    }

    if (!newComment.trim()) return

    setLoading(true)
    try {
      const comment: Comment = {
        id: Date.now(),
        content: newComment,
        author: {
          id: Number.parseInt(user.id),
          name: user.name,
          avatar: user.avatar || "/placeholder.svg?height=40&width=40",
        },
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
        replies: [],
      }

      setComments([comment, ...comments])
      setNewComment("")

      toast({
        title: "Comment posted",
        description: "Your comment has been added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitReply = async (parentId: number) => {
    if (!user || !replyContent.trim()) return

    setLoading(true)
    try {
      const reply: Comment = {
        id: Date.now(),
        content: replyContent,
        author: {
          id: Number.parseInt(user.id),
          name: user.name,
          avatar: user.avatar || "/placeholder.svg?height=40&width=40",
        },
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
        replies: [],
        parentId,
      }

      setComments(
        comments.map((comment) =>
          comment.id === parentId ? { ...comment, replies: [...comment.replies, reply] } : comment,
        ),
      )

      setReplyContent("")
      setReplyingTo(null)

      toast({
        title: "Reply posted",
        description: "Your reply has been added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post reply",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLikeComment = async (commentId: number, isReply = false, parentId?: number) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to like comments",
        variant: "destructive",
      })
      return
    }

    if (isReply && parentId) {
      setComments(
        comments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === commentId
                    ? {
                        ...reply,
                        isLiked: !reply.isLiked,
                        likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                      }
                    : reply,
                ),
              }
            : comment,
        ),
      )
    } else {
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                isLiked: !comment.isLiked,
                likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              }
            : comment,
        ),
      )
    }
  }

  const CommentItem = ({
    comment,
    isReply = false,
    parentId,
  }: { comment: Comment; isReply?: boolean; parentId?: number }) => (
    <div className={`space-y-3 ${isReply ? "ml-12 border-l-2 border-muted pl-4" : ""}`}>
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>

          <p className="text-sm leading-relaxed">{comment.content}</p>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLikeComment(comment.id, isReply, parentId)}
              className="h-8 px-2 gap-1"
            >
              <Heart className={`h-3 w-3 ${comment.isLiked ? "fill-current text-red-500" : ""}`} />
              <span className="text-xs">{comment.likes}</span>
            </Button>

            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="h-8 px-2 gap-1"
              >
                <Reply className="h-3 w-3" />
                <span className="text-xs">Reply</span>
              </Button>
            )}

            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Flag className="h-3 w-3" />
            </Button>
          </div>

          {replyingTo === comment.id && (
            <div className="space-y-2 pt-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[80px] text-sm"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleSubmitReply(comment.id)}
                  disabled={loading || !replyContent.trim()}
                >
                  {loading ? "Posting..." : "Post Reply"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setReplyingTo(null)
                    setReplyContent("")
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply={true} parentId={comment.id} />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <h2 className="text-xl font-semibold">
          Comments ({comments.length + comments.reduce((acc, comment) => acc + comment.replies.length, 0)})
        </h2>
      </div>

      {/* Add Comment */}
      {user ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="Share your thoughts about this story..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex justify-end">
                  <Button onClick={handleSubmitComment} disabled={loading || !newComment.trim()}>
                    {loading ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Please log in to join the discussion</p>
            <Button>Log In</Button>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id}>
            <CommentItem comment={comment} />
            {comment !== comments[comments.length - 1] && <Separator className="mt-6" />}
          </div>
        ))}

        {comments.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
