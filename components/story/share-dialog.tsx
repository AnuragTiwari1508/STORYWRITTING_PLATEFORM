"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Twitter, Facebook, LinkIcon, Mail, MessageCircle } from "lucide-react"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  story: {
    id: number
    title: string
    author: { name: string }
  }
}

export function ShareDialog({ open, onOpenChange, story }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const storyUrl = `${window.location.origin}/story/${story.id}`
  const shareText = `Check out "${story.title}" by ${story.author.name} on StoryVerse`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(storyUrl)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "Story link has been copied to your clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      })
    }
  }

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(storyUrl)}`
    window.open(url, "_blank")
  }

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storyUrl)}`
    window.open(url, "_blank")
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Check out this story: ${story.title}`)
    const body = encodeURIComponent(`${shareText}\n\n${storyUrl}`)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const shareViaWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${storyUrl}`)}`
    window.open(url, "_blank")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this story</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input value={storyUrl} readOnly className="flex-1" />
            <Button onClick={copyToClipboard} variant="outline">
              <LinkIcon className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={shareOnTwitter} variant="outline" className="gap-2 bg-transparent">
              <Twitter className="h-4 w-4" />
              Twitter
            </Button>

            <Button onClick={shareOnFacebook} variant="outline" className="gap-2 bg-transparent">
              <Facebook className="h-4 w-4" />
              Facebook
            </Button>

            <Button onClick={shareViaWhatsApp} variant="outline" className="gap-2 bg-transparent">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>

            <Button onClick={shareViaEmail} variant="outline" className="gap-2 bg-transparent">
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
