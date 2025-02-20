import { Router } from "express";
import { updateProfile } from "../controllers/userController.js";

const router = Router();

router.post("/update-profile", updateProfile);

export default router;
