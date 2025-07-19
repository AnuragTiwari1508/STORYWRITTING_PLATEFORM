"use client"

import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Heart, Bookmark, Users } from "lucide-react"
import { AdBanner } from "@/components/ads/ad-banner"

export function ReaderDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Reader Dashboard</h1>
          <p className="text-muted-foreground">Track your reading journey and discover new stories</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="reading" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="reading" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Reading
                </TabsTrigger>
                <TabsTrigger value="bookmarks" className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4" />
                  Bookmarks
                </TabsTrigger>
                <TabsTrigger value="liked" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Liked
                </TabsTrigger>
                <TabsTrigger value="following" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Following
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reading">
                <Card>
                  <CardHeader>
                    <CardTitle>Continue Reading</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Your reading list will appear here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookmarks">
                <Card>
                  <CardHeader>
                    <CardTitle>Bookmarked Stories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Your bookmarked stories will appear here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="liked">
                <Card>
                  <CardHeader>
                    <CardTitle>Liked Stories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Stories you've liked will appear here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="following">
                <Card>
                  <CardHeader>
                    <CardTitle>Following Authors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Authors you follow will appear here...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reading Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Stories Read</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Books Finished</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Authors Following</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Reading Streak</span>
                  <span className="font-semibold">7 days</span>
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
