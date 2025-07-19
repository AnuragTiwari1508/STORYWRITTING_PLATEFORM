import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Eye, Heart, MessageCircle, Users, TrendingUp } from "lucide-react"

export function WriterStats() {
  const stats = [
    { label: "Total Views", value: "15,234", icon: Eye, change: "+12%" },
    { label: "Total Likes", value: "2,891", icon: Heart, change: "+8%" },
    { label: "Comments", value: "456", icon: MessageCircle, change: "+15%" },
    { label: "Followers", value: "789", icon: Users, change: "+5%" },
  ]

  const recentStories = [
    { title: "The Digital Nomad", views: 1234, likes: 89, comments: 12 },
    { title: "Monsoon Memories", views: 987, likes: 67, comments: 8 },
    { title: "City of Dreams", views: 756, likes: 45, comments: 6 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <stat.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Recent Stories Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentStories.map((story, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{story.title}</h4>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {story.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {story.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {story.comments}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
