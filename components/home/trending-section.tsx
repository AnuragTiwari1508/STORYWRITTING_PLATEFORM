import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

const trendingContent = [
  {
    id: 1,
    title: "The Digital Nomad's Diary",
    author: "Alex Kumar",
    type: "Story",
    readTime: "15 min",
    trending: true,
  },
  {
    id: 2,
    title: "Monsoon Memories",
    author: "Priya Singh",
    type: "Poem",
    readTime: "3 min",
    trending: true,
  },
  {
    id: 3,
    title: "The Startup Chronicles",
    author: "Vikram Mehta",
    type: "Book",
    readTime: "2 hours",
    trending: false,
  },
  {
    id: 4,
    title: "Love in the Time of AI",
    author: "Neha Gupta",
    type: "Story",
    readTime: "12 min",
    trending: true,
  },
  {
    id: 5,
    title: "Himalayan Haikus",
    author: "Arjun Thapa",
    type: "Poem",
    readTime: "5 min",
    trending: false,
  },
]

export function TrendingSection() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Trending Now
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">What everyone's reading right now</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingContent.map((item, index) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                  <div className="flex items-center gap-2">
                    {item.trending && (
                      <Badge variant="destructive" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                    <Badge variant="outline">{item.type}</Badge>
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  <Link href={`/${item.type.toLowerCase()}/${item.id}`} className="hover:text-primary">
                    {item.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>by {item.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.readTime}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
