import { Router } from "express"
import { getIdeas, getIdea, createIdea, updateIdea, deleteIdea } from "../controllers/ideas"
import { authenticateToken } from "../middlewares/auth"

const router = Router()

router.get("/", getIdeas)
router.get("/:id", getIdea)
router.post("/", authenticateToken, createIdea)
router.put("/:id", authenticateToken, updateIdea)
router.delete("/:id", authenticateToken, deleteIdea)

export default router
