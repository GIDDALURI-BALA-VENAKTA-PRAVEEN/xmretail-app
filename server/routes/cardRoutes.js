import { createCard, deleteCard, getCards, updateCard } from "../controllers/cardController.js";

import express from "express";
import upload from "../middleware/Cardupload.js"; // Middleware for file upload

const router = express.Router();

router.get("/", getCards);
router.post("/", upload.single("image"), createCard);
router.put("/:id", upload.single("image"), updateCard); 
router.delete("/:id", deleteCard);

export default router;
