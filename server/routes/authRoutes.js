import { sendOtp, verifyOtp } from "../controllers/authController.js";

import { Router } from "express";

const router = Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
