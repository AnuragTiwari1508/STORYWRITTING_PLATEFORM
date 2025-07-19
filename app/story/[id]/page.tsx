import { StoryReader } from "@/components/story/story-reader"
import { StoryComments } from "@/components/story/story-comments"
import { RelatedStories } from "@/components/story/related-stories"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AdBanner } from "@/components/ads/ad-banner"
import { notFound } from "next/navigation"

async function getStory(id: string) {
  // In production, fetch from database
  const mockStory = {
    id: Number.parseInt(id),
    title: "The Last Library",
    content: `In the year 2087, books had become relics of the past. The Digital Revolution had swept away paper, ink, and the musty smell of old libraries. Everything was stored in the Cloud, accessible through neural implants that fed information directly into human consciousness.

But in the basement of what was once the New York Public Library, Sarah Chen maintained the last physical collection of books on Earth. As the final librarian, she had sworn an oath to preserve human knowledge in its original form.

The government had declared physical books illegal, claiming they were inefficient and took up valuable space. But Sarah knew the truth – they feared the power of unfiltered, unmonitored knowledge.

One rainy Tuesday morning, Sarah heard footsteps echoing through the abandoned library above. Her heart raced as she quickly hid the rare first edition of "1984" she had been reading. The footsteps grew closer, descending the stairs to her sanctuary.

"I know you're down there," called a voice. It was Marcus, a young man she had met weeks ago who claimed to be a fellow book lover. But something in his tone made her suspicious.

Sarah remained silent, pressing herself against the cold stone wall behind a shelf of philosophy books. The beam of a flashlight cut through the darkness, searching.

"The Council knows about this place," Marcus continued. "They're coming tomorrow to burn everything. But I can help you save some of the books if you cooperate."

Sarah's mind raced. Could she trust him? The books around her represented centuries of human thought, creativity, and wisdom. She couldn't let them be destroyed, but she also couldn't risk exposing the underground network of book preservers she had spent years building.

As Marcus's footsteps grew closer, Sarah made a decision that would change everything...`,
    author: {
      id: 1,
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Sci-fi enthusiast and storyteller",
      followers: 1234,
      stories: 15,
    },
    genre: "Sci-Fi",
    tags: ["dystopian", "books", "future", "resistance"],
    publishedAt: "2024-01-15T10:00:00Z",
    readTime: 15,
    views: 5678,
    likes: 1234,
    comments: 89,
    bookmarks: 456,
    isLiked: false,
    isBookmarked: false,
    isFollowing: false,
  }

  if (!mockStory) {
    notFound()
  }

  return mockStory
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const story = await getStory(params.id)

  return {
    title: `${story.title} - StoryVerse`,
    description: story.content.substring(0, 160) + "...",
    keywords: story.tags.join(", "),
    openGraph: {
      title: story.title,
      description: story.content.substring(0, 160) + "...",
      type: "article",
      authors: [story.author.name],
      tags: story.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.content.substring(0, 160) + "...",
    },
  }
}

export default async function StoryPage({ params }: { params: { id: string } }) {
  const story = await getStory(params.id)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <StoryReader story={story} />
            <AdBanner position="middle" className="my-8" />
            <StoryComments storyId={story.id} />
          </div>

          <div className="space-y-6">
            <AdBanner position="sidebar" />
            <RelatedStories currentStoryId={story.id} genre={story.genre} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
