"use client"

import { useState } from "react"
import { Idea, categories } from "@/lib/data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lightbulb } from "lucide-react"

interface EditIdeaDialogProps {
    idea: Idea | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (updatedIdea: Idea) => void
}

export function EditIdeaDialog({ idea, open, onOpenChange, onSave }: EditIdeaDialogProps) {
    const [title, setTitle] = useState(idea?.title || "")
    const [category, setCategory] = useState(idea?.category || "")
    const [shortDescription, setShortDescription] = useState(idea?.shortDescription || "")
    const [fullDescription, setFullDescription] = useState(idea?.fullDescription || "")

    // Update state when idea changes
    useState(() => {
        if (idea) {
            setTitle(idea.title)
            setCategory(idea.category)
            setShortDescription(idea.shortDescription)
            setFullDescription(idea.fullDescription)
        }
    })

    // Short description limit: 155 chars
    // Full description limit: 183 chars in the mockup roughly

    if (!idea) return null

    const handleSave = () => {
        onSave({
            ...idea,
            title,
            category,
            shortDescription,
            fullDescription
        })
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] p-6 gap-6">
                <DialogHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <DialogTitle className="text-xl font-semibold leading-none tracking-tight">Edit {idea.title}...</DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            Share your startup concept with the community
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <div className="grid gap-5">
                    <div className="grid gap-2">
                        <Label htmlFor="title" className="text-sm font-medium">Idea Title <span className="text-muted-foreground text-xs">*</span></Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-muted/50 border-transparent focus-visible:bg-background focus-visible:border-ring"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category" className="text-sm font-medium">Category <span className="text-muted-foreground text-xs">*</span></Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="bg-muted/50 border-transparent focus-visible:bg-background focus-visible:border-ring">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((c) => (
                                    <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="short-desc" className="text-sm font-medium">Short Description <span className="text-muted-foreground text-xs">*</span></Label>
                        <Textarea
                            id="short-desc"
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            className="min-h-[80px] resize-none bg-muted/50 border-transparent focus-visible:bg-background focus-visible:border-ring"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>This will appear in the idea feed preview</span>
                            <span>155 characters</span>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="full-desc" className="text-sm font-medium">Full Description <span className="text-muted-foreground text-xs">*</span></Label>
                        <Textarea
                            id="full-desc"
                            value={fullDescription}
                            onChange={(e) => setFullDescription(e.target.value)}
                            className="min-h-[100px] resize-none bg-muted/50 border-transparent focus-visible:bg-background focus-visible:border-ring"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Explain your idea in detail</span>
                            <span>183 characters</span>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:space-x-0 mt-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-full px-6">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} className="rounded-full px-6 bg-muted text-muted-foreground hover:bg-muted opacity-50 cursor-not-allowed">
                        Submit Idea
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
