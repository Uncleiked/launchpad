import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: "asc" }
        })
        res.status(200).json(categories)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error." })
    }
}
