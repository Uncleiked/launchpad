import { Request, Response, NextFunction } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import z from "zod"

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key"

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
})

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password } = registerSchema.parse(req.body)

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            res.status(400).json({ error: "Email already in use." })
            return
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
            },
        })

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" })

        res.status(201).json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues })
            return
        }
        console.error(error)
        res.status(500).json({ error: "Internal server error." })
    }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = loginSchema.parse(req.body)

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            res.status(401).json({ error: "Invalid credentials." })
            return
        }

        const isValidPassword = await bcrypt.compare(password, user.passwordHash)
        if (!isValidPassword) {
            res.status(401).json({ error: "Invalid credentials." })
            return
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" })

        res.status(200).json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.issues })
            return
        }
        console.error(error)
        res.status(500).json({ error: "Internal server error." })
    }
}

export const me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = (req as any).userId
        const user = await prisma.user.findUnique({ where: { id: userId } })

        if (!user) {
            res.status(404).json({ error: "User not found." })
            return
        }

        res.status(200).json({
            user: { id: user.id, name: user.name, email: user.email },
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error." })
    }
}
