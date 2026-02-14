import nodemailer from "nodemailer";
import { env } from "../../config/env";

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

        return {
            success: true,
            messageId: info.messageId,
        };
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown SMTP error";
        return {
            success: false,
            error: message,
        };
    }
};
