import { Router } from "express";
import { requireApiKey } from "../middlewares/apiKey.middleware";
import { validateEmailPayload } from "../middlewares/emailValidation.middleware";
import { sendEmail } from "../controllers/email.controller";

const router = Router();

router.post("/email/send", requireApiKey, validateEmailPayload, sendEmail);

export default router;
