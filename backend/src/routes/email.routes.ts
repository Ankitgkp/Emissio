import { Router } from "express";
import { sendEmail } from "../controllers/email.controller";

const router = Router();

router.post("/email/send", sendEmail);

export default router;
