"use client"

import { useState } from "react"
import { myIdeas, Idea } from "@/lib/data"
import { IdeaCard } from "@/components/idea-card"
import { EditIdeaDialog } from "@/components/edit-idea-dialog"
import { DeleteIdeaAlert } from "@/components/delete-idea-alert"
import { Button } from "@/components/ui/button"
import { Plus, User } from "lucide-react"

export default function MyIdeasPage() {
    const [ideas, setIdeas] = useState<Idea[]>(myIdeas)
    const [editingIdea, setEditingIdea] = useState<Idea | null>(null)
    const [deletingIdea, setDeletingIdea] = useState<Idea | null>(null)

    // Calculate stats
    const totalIdeas = ideas.length
    const totalUpvotes = ideas.reduce((sum, idea) => sum + idea.upvotes, 0)
    const totalComments = ideas.reduce((sum, idea) => sum + idea.comments, 0)

    const handleEdit = (updatedIdea: Idea) => {
        setIdeas(ideas.map(i => i.id === updatedIdea.id ? updatedIdea : i))
    }

    const handleDelete = (id: string) => {
        setIdeas(ideas.filter(i => i.id !== id))
    }

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-8 lg:px-8">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <User className="h-5 w-5" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Ideas</h1>
                    </div>
                    <p className="text-muted-foreground ml-[52px]">Manage and track your submitted ideas</p>
                </div>

                <Button className="shrink-0 font-semibold shadow-sm h-10 px-4 rounded-lg self-start sm:self-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    New Idea
                </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Total Ideas</div>
                    <div className="text-3xl font-bold text-foreground">{totalIdeas}</div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Total Upvotes</div>
                    <div className="text-3xl font-bold text-primary">{totalUpvotes}</div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Total Comments</div>
                    <div className="text-3xl font-bold text-foreground">{totalComments}</div>
                </div>
            </div>

            {/* Ideas List */}
            <div className="flex flex-col gap-4">
                {ideas.map((idea) => (
                    <IdeaCard
                        key={idea.id}
                        idea={idea}
                        showActions={true}
                        onEdit={setEditingIdea}
                        onDelete={setDeletingIdea}
                    />
                ))}

                {ideas.length === 0 && (
                    <div className="text-center py-12 bg-muted/30 rounded-xl border border-border border-dashed">
                        <h3 className="text-lg font-semibold mb-2">No ideas yet</h3>
                        <p className="text-muted-foreground mb-4">You haven't submitted any ideas yet.</p>
                        <Button variant="outline">Create your first idea</Button>
                    </div>
                )}
            </div>

            {/* Modals */}
            <EditIdeaDialog
                idea={editingIdea}
                open={!!editingIdea}
                onOpenChange={(open) => !open && setEditingIdea(null)}
                onSave={handleEdit}
            />

            <DeleteIdeaAlert
                idea={deletingIdea}
                open={!!deletingIdea}
                onOpenChange={(open) => !open && setDeletingIdea(null)}
                onDelete={handleDelete}
            />
        </div>
    )
}
