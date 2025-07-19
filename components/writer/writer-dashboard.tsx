"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PenTool, Upload, BarChart3, Settings } from "lucide-react"
import { StoryEditor } from "./story-editor"
import { BookUploader } from "./book-uploader"
import { WriterStats } from "./writer-stats"
import { AdBanner } from "@/components/ads/ad-banner"

export function WriterDashboard() {
  const [activeTab, setActiveTab] = useState("write")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Writer Dashboard</h1>
          <p className="text-muted-foreground">Create and manage your stories, poems, and books</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="write" className="flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  Write
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Book
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="write" className="mt-6">
                <StoryEditor />
              </TabsContent>

              <TabsContent value="upload" className="mt-6">
                <BookUploader />
              </TabsContent>

              <TabsContent value="stats" className="mt-6">
                <WriterStats />
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Writer Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Settings panel coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Stories Published</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Views</span>
                  <span className="font-semibold">15,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Followers</span>
                  <span className="font-semibold">456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Likes</span>
                  <span className="font-semibold">2,891</span>
                </div>
              </CardContent>
            </Card>

            <AdBanner position="sidebar" />
          </div>
        </div>
      </div>
    </div>
  )
}
