import { categories } from "@/lib/data"
import { CategoryGrid } from "@/components/category-grid"

export default function CategoriesPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 lg:px-8 lg:py-8">
      <h1 className="text-2xl font-bold text-foreground text-balance">
        Browse by Category
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Explore ideas organized by industry and focus area
      </p>

      <CategoryGrid categories={categories} />
    </div>
  )
}
