import { Router } from "express";
import { requireApiKey } from "../middlewares/apiKey.middleware";
import { rateLimit } from "../middlewares/rateLimit.middleware";
import { validateEmailPayload } from "../middlewares/emailValidation.middleware";
import { sendEmail } from "../controllers/email.controller";

const router = Router();

router.post("/email/send", requireApiKey, rateLimit, validateEmailPayload, sendEmail);

export default router;
