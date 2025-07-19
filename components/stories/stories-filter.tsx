"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter } from "lucide-react"

const genres = [
  "Fiction",
  "Romance",
  "Mystery",
  "Sci-Fi",
  "Fantasy",
  "Horror",
  "Poetry",
  "Non-Fiction",
  "Biography",
  "History",
]

const sortOptions = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Most Popular" },
  { value: "trending", label: "Trending" },
  { value: "likes", label: "Most Liked" },
]

export function StoriesFilter() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("latest")

  const handleGenreChange = (genre: string, checked: boolean) => {
    if (checked) {
      setSelectedGenres([...selectedGenres, genre])
    } else {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="h-5 w-5" />
            Search Stories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by title, author, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filter by Genre
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center space-x-2">
              <Checkbox
                id={genre}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
              />
              <Label htmlFor={genre} className="text-sm font-normal cursor-pointer">
                {genre}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sortOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <input
                type="radio"
                id={option.value}
                name="sort"
                value={option.value}
                checked={sortBy === option.value}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-primary"
              />
              <Label htmlFor={option.value} className="text-sm font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button className="w-full">Apply Filters</Button>
    </div>
  )
}
