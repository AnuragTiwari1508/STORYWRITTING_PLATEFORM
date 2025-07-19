"use client"

import { useEffect, useState } from "react"

interface AdBannerProps {
  position: "top" | "middle" | "bottom" | "sidebar"
  className?: string
}

export function AdBanner({ position, className = "" }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  // Simulate ad loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  const getAdSize = () => {
    switch (position) {
      case "top":
      case "bottom":
        return "h-24 md:h-32"
      case "middle":
        return "h-32 md:h-40"
      case "sidebar":
        return "h-64"
      default:
        return "h-24"
    }
  }

  return (
    <div
      className={`w-full ${getAdSize()} bg-muted/50 border-2 border-dashed border-muted-foreground/20 flex items-center justify-center my-8 ${className}`}
    >
      <div className="text-center text-muted-foreground">
        <div className="text-sm font-medium mb-1">Advertisement</div>
        <div className="text-xs">{position === "sidebar" ? "300x250" : "728x90"} Ad Space</div>
        <div className="text-xs mt-2 opacity-60">Google AdSense / Affiliate Ads</div>
      </div>
    </div>
  )
}
