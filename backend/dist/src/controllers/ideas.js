"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIdea = exports.updateIdea = exports.createIdea = exports.getIdea = exports.getIdeas = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getIdeas = async (req, res) => {
    try {
        const { category, sort } = req.query;
        let whereClause = {};
        if (category && category !== "all") {
            whereClause.category = {
                name: String(category)
            };
        }
        let orderByClause = { createdAt: "desc" }; // default: newest
        if (sort === "top") {
            orderByClause = { upvotesCount: "desc" };
        }
        else if (sort === "comments") {
            orderByClause = { comments: { _count: "desc" } };
        }
        const ideas = await prisma.idea.findMany({
            where: whereClause,
            orderBy: orderByClause,
            include: {
                author: { select: { id: true, name: true } },
                category: { select: { id: true, name: true, color: true } },
                _count: { select: { comments: true } }
            }
        });
        const transformedIdeas = ideas.map((idea) => ({
            ...idea,
            commentsCount: idea._count.comments,
            _count: undefined
        }));
        res.status(200).json(transformedIdeas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.getIdeas = getIdeas;
const getIdea = async (req, res) => {
    try {
        const idea = await prisma.idea.findUnique({
            where: { id: req.params.id },
            include: {
                author: { select: { id: true, name: true } },
                category: { select: { id: true, name: true, color: true } },
                comments: {
                    include: { author: { select: { name: true } } },
                    orderBy: { createdAt: "desc" }
                }
            }
        });
        if (!idea) {
            res.status(404).json({ error: "Idea not found." });
            return;
        }
        res.status(200).json(idea);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.getIdea = getIdea;
const createIdea = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, shortDescription, fullDescription, categoryId } = req.body;
        const idea = await prisma.idea.create({
            data: {
                title,
                shortDescription,
                fullDescription,
                authorId: userId,
                categoryId
            }
        });
        res.status(201).json(idea);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.createIdea = createIdea;
const updateIdea = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, shortDescription, fullDescription, categoryId } = req.body;
        const idea = await prisma.idea.findUnique({ where: { id: req.params.id } });
        if (!idea) {
            res.status(404).json({ error: "Idea not found." });
            return;
        }
        if (idea.authorId !== userId) {
            res.status(403).json({ error: "Forbidden." });
            return;
        }
        const updatedIdea = await prisma.idea.update({
            where: { id: req.params.id },
            data: { title, shortDescription, fullDescription, categoryId }
        });
        res.status(200).json(updatedIdea);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.updateIdea = updateIdea;
const deleteIdea = async (req, res) => {
    try {
        const userId = req.userId;
        const idea = await prisma.idea.findUnique({ where: { id: req.params.id } });
        if (!idea) {
            res.status(404).json({ error: "Idea not found." });
            return;
        }
        if (idea.authorId !== userId) {
            res.status(403).json({ error: "Forbidden." });
            return;
        }
        await prisma.idea.delete({ where: { id: req.params.id } });
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.deleteIdea = deleteIdea;
//# sourceMappingURL=ideas.js.map