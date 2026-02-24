import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import z from "zod"

const prisma = new PrismaClient()

export const getIdeas = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category, sort } = req.query

        let whereClause: any = {}
        if (category && category !== "all") {
            whereClause.category = {
                name: String(category)
            }
        }

        let orderByClause: any = { createdAt: "desc" } // default: newest
        if (sort === "top") {
            orderByClause = { upvotesCount: "desc" }
        } else if (sort === "comments") {
            orderByClause = { comments: { _count: "desc" } }
        }

        const ideas = await prisma.idea.findMany({
            where: whereClause,
            orderBy: orderByClause,
            include: {
                author: { select: { id: true, name: true } },
                category: { select: { id: true, name: true, color: true } },
                _count: { select: { comments: true } }
            }
        })

        const transformedIdeas = ideas.map((idea: any) => ({
            ...idea,
            commentsCount: idea._count.comments,
            _count: undefined
        }))

        res.status(200).json(transformedIdeas)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error." })
    }
}

export const getIdea = async (req: Request, res: Response): Promise<void> => {
    try {
        const idea = await prisma.idea.findUnique({
            where: { id: req.params.id as string },
            include: {
                author: { select: { id: true, name: true } },
                category: { select: { id: true, name: true, color: true } },
                comments: {
                    include: { author: { select: { name: true } } },
                    orderBy: { createdAt: "desc" }
                }
            }
        })

        if (!idea) {
            res.status(404).json({ error: "Idea not found." })
            return
        }
        res.status(200).json(idea)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error." })
    }
}

export const createIdea = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).userId
        const { title, shortDescription, fullDescription, categoryId } = req.body

        const idea = await prisma.idea.create({
            data: {
                title,
                shortDescription,
                fullDescription,
                authorId: userId,
                categoryId
            }
        })

        res.status(201).json(idea)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error." })
    }
}

export const updateIdea = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).userId
        const { title, shortDescription, fullDescription, categoryId } = req.body

        const idea = await prisma.idea.findUnique({ where: { id: req.params.id as string } })

        if (!idea) {
            res.status(404).json({ error: "Idea not found." })
            return
        }

        if (idea.authorId !== userId) {
            res.status(403).json({ error: "Forbidden." })
            return
        }

        const updatedIdea = await prisma.idea.update({
            where: { id: req.params.id as string },
            data: { title, shortDescription, fullDescription, categoryId }
        })

        res.status(200).json(updatedIdea)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error." })
    }
}

export const deleteIdea = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).userId

        const idea = await prisma.idea.findUnique({ where: { id: req.params.id as string } })

        if (!idea) {
            res.status(404).json({ error: "Idea not found." })
            return
        }

        if (idea.authorId !== userId) {
            res.status(403).json({ error: "Forbidden." })
            return
        }

        await prisma.idea.delete({ where: { id: req.params.id as string } })

        res.status(204).send()
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error." })
    }
}
