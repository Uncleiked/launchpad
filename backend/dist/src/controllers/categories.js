"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: "asc" }
        });
        res.status(200).json(categories);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.getCategories = getCategories;
//# sourceMappingURL=categories.js.map