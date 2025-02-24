import { getProfile, updateProfile } from "../controllers/userController.js";

import { Router } from "express";

const router = Router();

router.put("/update-profile", updateProfile);
router.get("/profile",  getProfile);

export default router;
