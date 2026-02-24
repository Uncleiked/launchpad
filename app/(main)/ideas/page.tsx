"use client"

import { useState, useMemo } from "react"
import { allIdeas, categories } from "@/lib/data"
import { IdeaCard } from "@/components/idea-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AllIdeasPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredIdeas = useMemo(() => {
    // Filter
    let result = allIdeas
    if (selectedCategory !== "all") {
      result = result.filter(idea => idea.category === selectedCategory)
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "top") {
        return b.upvotes - a.upvotes
      }
      if (sortBy === "comments") {
        return b.comments - a.comments
      }
      // "newest" fallback (simulated by existing order or date parsed if it was real date)
      return 0
    })

    return result
  }, [selectedCategory, sortBy])

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 lg:px-8 lg:py-8">
      <h1 className="text-2xl font-bold text-foreground text-balance">
        Discover Ideas
      </h1>

      <div className="mt-4 flex flex-wrap gap-3">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.name} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="top">Top Voted</SelectItem>
            <SelectItem value="comments">Most Discussed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {filteredIdeas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
        {filteredIdeas.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No ideas found for this category.
          </div>
        )}
      </div>
    </div>
  )
}
