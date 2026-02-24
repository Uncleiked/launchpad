"use client"

import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Idea } from "@/lib/data"

interface IdeaCardProps {
  idea: Idea
  showActions?: boolean
  onEdit?: (idea: Idea) => void
  onDelete?: (idea: Idea) => void
}

export function IdeaCard({ idea, showActions = false, onEdit, onDelete }: IdeaCardProps) {
  const isPublished = idea.status === "Published"

  return (
    <Link
      href={`/ideas/${idea.id}`}
      className="group block rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md h-full flex flex-col"
    >
      <div className="flex flex-col h-full">
        {/* Header: Title and Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary leading-tight">
            {idea.title}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
            <Badge
              variant="secondary"
              className={`text-xs font-semibold ${isPublished ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-50' : 'bg-amber-50 text-amber-600 hover:bg-amber-50'}`}
            >
              {idea.status}
            </Badge>
            <Badge variant="secondary" className="bg-muted/50 text-muted-foreground hover:bg-muted/50 text-xs text-nowrap max-w-[120px] truncate">
              {idea.category}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <p className="text-[15px] leading-relaxed text-muted-foreground line-clamp-2 mb-6 flex-1 pr-12">
          {idea.shortDescription}
        </p>

        {/* Footer: Stats and Actions */}
        <div className="flex items-center justify-between mt-auto">
          {/* Stats inline */}
          <div className="flex items-center gap-3 text-sm font-medium text-foreground">
            <span className="font-bold">{idea.upvotes} {idea.upvotes === 1 ? 'upvote' : 'upvotes'}</span>
            <span className="text-muted-foreground font-normal mx-0.5">{"•"}</span>
            <span className="text-muted-foreground font-normal">{idea.comments} comments</span>
            <span className="text-muted-foreground font-normal mx-0.5">{"•"}</span>
            <span className="text-muted-foreground font-normal">{idea.timeAgo}</span>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="outline"
                size="sm"
                className="h-9 shadow-sm rounded-lg font-semibold px-4 border-2 border-slate-500/40 text-slate-800 hover:bg-slate-50 hover:text-slate-900 bg-transparent flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onEdit?.(idea)
                }}
              >
                <Pencil className="size-4" strokeWidth={2.5} />
                <span className="text-base">Edit</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 shadow-sm rounded-lg font-semibold px-4 text-red-600 hover:text-red-700 border-2 border-red-400 bg-transparent hover:bg-red-50 flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onDelete?.(idea)
                }}
              >
                <Trash2 className="size-4" strokeWidth={2.5} />
                <span className="text-base">Delete</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
