import nodemailer from "nodemailer";
import { env } from "../../config/env";
import { logger } from "../../utils/logger";

interface SmtpPayload {
    to: string;
    subject: string;
    content: string;
}

interface SmtpResult {
    success: boolean;
    messageId?: string;
    error?: string;
}

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
    },
});

export const send = async (payload: SmtpPayload): Promise<SmtpResult> => {
    try {
        const info = await transporter.sendMail({
            from: env.SMTP_USER,
            to: payload.to,
            subject: payload.subject,
            text: payload.content,
        });

        logger.info("smtp_send_success", {
            to: payload.to,
            messageId: info.messageId,
        });

        return {
            success: true,
            messageId: info.messageId,
        };
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown SMTP error";

        logger.error("smtp_send_failure", {
            to: payload.to,
            error: message,
        });

        return {
            success: false,
            error: message,
        };
    }
};
