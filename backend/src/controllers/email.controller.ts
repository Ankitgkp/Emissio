import { Request, Response, NextFunction } from "express";
import { sendEmail as sendEmailService } from "../services/email.service";
import { logger, maskApiKey } from "../utils/logger";

export const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers["x-api-key"] as string;

    logger.info("email_request_received", {
        route: "POST /v1/email/send",
        apiKey: maskApiKey(apiKey),
        to: req.body.to,
    });

    try {
        const { to, subject, content } = req.body;
        const messageId = await sendEmailService({ to, subject, content });

        logger.info("email_request_success", {
            apiKey: maskApiKey(apiKey),
            to,
            messageId,
        });

        res.status(200).json({
            success: true,
            message: `Email sent successfully (ID: ${messageId})`,
        });
    } catch (err) {
        next(err);
    }
};