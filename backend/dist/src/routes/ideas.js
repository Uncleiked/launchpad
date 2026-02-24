"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ideas_1 = require("../controllers/ideas");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get("/", ideas_1.getIdeas);
router.get("/:id", ideas_1.getIdea);
router.post("/", auth_1.authenticateToken, ideas_1.createIdea);
router.put("/:id", auth_1.authenticateToken, ideas_1.updateIdea);
router.delete("/:id", auth_1.authenticateToken, ideas_1.deleteIdea);
exports.default = router;
//# sourceMappingURL=ideas.js.map