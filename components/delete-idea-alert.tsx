"use client"

import { Idea } from "@/lib/data"
import { AlertCircle } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteIdeaAlertProps {
    idea: Idea | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onDelete: (id: string) => void
}

export function DeleteIdeaAlert({ idea, open, onOpenChange, onDelete }: DeleteIdeaAlertProps) {
    if (!idea) return null

    const handleDelete = () => {
        onDelete(idea.id)
        onOpenChange(false)
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="sm:max-w-[460px] p-8">
                <AlertDialogHeader className="flex flex-col items-center gap-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                        <AlertCircle className="h-8 w-8 text-red-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <AlertDialogTitle className="text-2xl font-bold tracking-tight">Are you sure you want to delete?</AlertDialogTitle>
                        <AlertDialogDescription className="text-base text-foreground mt-4">
                            You're attempting to delete "{idea.title}"
                        </AlertDialogDescription>
                        <div className="text-sm font-semibold mt-2 text-foreground">
                            This action cannot be undone!
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-col gap-3 mt-6 sm:space-x-0">
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="w-full bg-[#E50000] text-white hover:bg-[#E50000]/90 rounded-md py-6 text-base font-semibold"
                    >
                        Proceed
                    </AlertDialogAction>
                    <AlertDialogCancel className="w-full border-none shadow-none text-primary hover:text-primary hover:bg-transparent text-sm font-semibold m-0 mt-0 sm:mt-0">
                        Cancel
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
