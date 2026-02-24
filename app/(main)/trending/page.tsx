"use client"

import { useState, useMemo } from "react"
import { trendingIdeas, categories } from "@/lib/data"
import { ChevronUp, MessageSquare, TrendingUp, Flame } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { cn } from "@/lib/utils"

const rankColors: Record<number, string> = {
  1: "bg-primary text-primary-foreground",
  2: "bg-muted text-foreground",
  3: "bg-amber-100 text-amber-700",
}

export default function TrendingPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [time, setTime] = useState("today")

  const filteredTrendingIdeas = useMemo(() => {
    let result = trendingIdeas
    if (selectedCategory !== "all") {
      result = result.filter(idea => idea.category === selectedCategory)
    }

    // Since we don't have real dates in mock data, 'time' filter is just for show right now,
    // in a real backend this would pass the ?time=today parameter. 
    // We'll just return the filtered array by category.
    return result
  }, [selectedCategory, time])

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex items-center gap-2">
        <Flame className="size-7 text-orange-500" />
        <h1 className="text-2xl font-bold text-foreground text-balance">
          Trending Ideas
        </h1>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Most popular ideas gaining momentum right now
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>

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
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {filteredTrendingIdeas.map((idea) => (
          <Link
            key={idea.id}
            href={`/ideas/${idea.id}`}
            className="group block rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex gap-4">
              {/* Rank indicator */}
              <div className="flex shrink-0 flex-col items-center gap-1">
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full text-xs font-bold",
                    rankColors[idea.rank] ?? "bg-muted text-muted-foreground"
                  )}
                >
                  {idea.rank}
                </span>
                <span className="flex items-center gap-0.5 text-xs font-medium text-primary">
                  <TrendingUp className="size-3" />
                  {idea.trendScore}
                </span>
              </div>

              {/* Upvote button */}
              <div className="flex shrink-0 flex-col items-center">
                <div className="flex flex-col items-center rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
                  <ChevronUp className="size-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    {idea.upvotes}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary text-balance">
                    {idea.title}
                  </h3>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {idea.category}
                  </Badge>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {idea.shortDescription}
                </p>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MessageSquare className="size-3.5" />
                  <span>{idea.comments} comments</span>
                  <span className="mx-1">{"·"}</span>
                  <span>by {idea.author}</span>
                  <span className="mx-1">{"·"}</span>
                  <span>{idea.timeAgo}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {filteredTrendingIdeas.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No trending ideas found for this category.
          </div>
        )}
      </div>
    </div>
  )
}
