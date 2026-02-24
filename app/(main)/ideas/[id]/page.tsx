"use client"

import Link from "next/link"
import { ArrowLeft, ChevronUp, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { allIdeas, ideaComments } from "@/lib/data"
import { use } from "react"

export default function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const idea = allIdeas.find((i) => i.id === id) ?? allIdeas[0]

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 lg:px-8 lg:py-8">
      <Link
        href="/ideas"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to ideas
      </Link>

      {/* Idea detail card */}
      <article className="rounded-xl border border-border bg-card p-6">
        <div className="flex gap-5">
          <div className="flex shrink-0 flex-col items-center">
            <button
              type="button"
              className="flex flex-col items-center rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 transition-colors hover:bg-primary/10"
              aria-label={`Upvote this idea, current count: ${idea.upvotes}`}
            >
              <ChevronUp className="size-5 text-primary" />
              <span className="text-lg font-bold text-primary">{idea.upvotes}</span>
            </button>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h1 className="text-xl font-bold text-foreground lg:text-2xl text-balance">
                {idea.title}
              </h1>
              <Badge variant="outline" className="shrink-0">
                {idea.category}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              by <span className="font-medium text-foreground">{idea.author}</span>
              {" · "}
              {idea.timeAgo}
            </p>

            <div className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
              {idea.fullDescription}
            </div>
          </div>
        </div>
      </article>

      {/* Comments section */}
      <section className="mt-6 rounded-xl border border-border bg-card p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <MessageSquare className="size-5" />
          Comments ({ideaComments.length})
        </h2>

        <div className="mt-4">
          <Textarea
            placeholder="Share your thoughts..."
            className="min-h-20 bg-secondary"
          />
          <div className="mt-3 flex justify-end">
            <Button size="sm">Post Comment</Button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          {ideaComments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="size-9 shrink-0">
                {comment.avatar && (
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                )}
                <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                  {comment.initials ??
                    comment.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {comment.author}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {"· "}
                    {comment.timeAgo}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
