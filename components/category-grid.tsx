"use client"

import Link from "next/link"
import { FolderOpen, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Category } from "@/lib/data"

const colorMap: Record<string, string> = {
  "Developer Tools": "text-primary",
  "E-commerce": "text-primary",
  "Health & Wellness": "text-orange-500",
  "Smart Home": "text-emerald-500",
  "Food & Beverage": "text-red-500",
  Finance: "text-emerald-600",
  Education: "text-primary",
  Productivity: "text-pink-500",
  Entertainment: "text-amber-500",
  "Social Network": "text-primary",
  "Travel & Tourism": "text-teal-500",
  Sustainability: "text-lime-600",
}

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={`/ideas?category=${encodeURIComponent(cat.name)}`}
          className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "flex size-10 items-center justify-center rounded-lg bg-secondary",
                colorMap[cat.name] ?? "text-primary"
              )}
            >
              <FolderOpen className="size-5" />
            </div>
            <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-foreground">
            {cat.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {cat.description}
          </p>
          <p className="mt-3 text-sm text-foreground">
            <span className="font-semibold">{cat.ideaCount}</span>{" "}
            <span className="text-muted-foreground">ideas</span>
          </p>
        </Link>
      ))}
    </div>
  )
}
