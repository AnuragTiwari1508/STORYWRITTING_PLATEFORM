"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface ReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contentId: number
  contentType: "story" | "comment" | "book"
}

const reportReasons = [
  { value: "spam", label: "Spam or misleading content" },
  { value: "harassment", label: "Harassment or bullying" },
  { value: "hate", label: "Hate speech or discrimination" },
  { value: "violence", label: "Violence or dangerous content" },
  { value: "copyright", label: "Copyright infringement" },
  { value: "inappropriate", label: "Inappropriate content" },
  { value: "other", label: "Other" },
]

export function ReportDialog({ open, onOpenChange, contentId, contentType }: ReportDialogProps) {
  const [reason, setReason] = useState("")
  const [details, setDetails] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!reason) {
      toast({
        title: "Error",
        description: "Please select a reason for reporting",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // API call to submit report
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      toast({
        title: "Report submitted",
        description: "Thank you for your report. We'll review it shortly.",
      })

      onOpenChange(false)
      setReason("")
      setDetails("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report {contentType}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-3 block">Why are you reporting this {contentType}?</Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              {reportReasons.map((reportReason) => (
                <div key={reportReason.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={reportReason.value} id={reportReason.value} />
                  <Label htmlFor={reportReason.value} className="text-sm">
                    {reportReason.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="details" className="text-sm font-medium">
              Additional details (optional)
            </Label>
            <Textarea
              id="details"
              placeholder="Provide any additional context..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading} className="flex-1">
              {loading ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
