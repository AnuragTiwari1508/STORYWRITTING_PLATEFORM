"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Filter } from "lucide-react"

const genres = [
  "Fiction",
  "Non-Fiction",
  "Business",
  "Technology",
  "Poetry",
  "Romance",
  "Mystery",
  "Sci-Fi",
  "Fantasy",
  "Biography",
  "History",
  "Cooking",
  "Travel",
  "Self-Help",
  "Health",
  "Education",
]

const languages = [
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese",
  "Japanese",
]

const sortOptions = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Most Popular" },
  { value: "downloads", label: "Most Downloaded" },
  { value: "rating", label: "Highest Rated" },
  { value: "pages-asc", label: "Shortest First" },
  { value: "pages-desc", label: "Longest First" },
]

export function BooksFilter() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [pageRange, setPageRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState("latest")
  const [showFreeOnly, setShowFreeOnly] = useState(false)

  const handleGenreChange = (genre: string, checked: boolean) => {
    if (checked) {
      setSelectedGenres([...selectedGenres, genre])
    } else {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    }
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages([...selectedLanguages, language])
    } else {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== language))
    }
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedGenres([])
    setSelectedLanguages([])
    setPageRange([0, 500])
    setSortBy("latest")
    setShowFreeOnly(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="h-5 w-5" />
            Search Books
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
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Free Books Only */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="free-only"
              checked={showFreeOnly}
              onCheckedChange={(checked) => setShowFreeOnly(checked as boolean)}
            />
            <Label htmlFor="free-only" className="text-sm font-normal cursor-pointer">
              Free books only
            </Label>
          </div>

          {/* Page Count Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Page Count</Label>
            <div className="px-2">
              <Slider value={pageRange} onValueChange={setPageRange} max={500} min={0} step={10} className="w-full" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{pageRange[0]} pages</span>
                <span>{pageRange[1]} pages</span>
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Genres</Label>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {genres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox
                    id={`genre-${genre}`}
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
                  />
                  <Label htmlFor={`genre-${genre}`} className="text-sm font-normal cursor-pointer">
                    {genre}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Languages</Label>
            <div className="max-h-32 overflow-y-auto space-y-2">
              {languages.map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox
                    id={`lang-${language}`}
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                  />
                  <Label htmlFor={`lang-${language}`} className="text-sm font-normal cursor-pointer">
                    {language}
                  </Label>
                </div>
              ))}
            </div>
          </div>
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

      <div className="flex gap-2">
        <Button className="flex-1">Apply Filters</Button>
        <Button variant="outline" onClick={clearAllFilters}>
          Clear All
        </Button>
      </div>
    </div>
  )
}
