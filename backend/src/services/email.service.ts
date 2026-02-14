import { send } from "../infrastructure/smtp/smtpClient";
import { SmtpError } from "../errors/AppError";
import { logger, truncate } from "../utils/logger";

interface EmailData {
    to: string;
    subject: string;
    content: string;
}

export const sendEmail = async (data: EmailData): Promise<string> => {
    logger.info("email_send_attempt", {
        to: data.to,
        subject: truncate(data.subject),
    });

    const result = await send(data);

    if (!result.success) {
        logger.error("email_send_failed", {
            to: data.to,
            reason: result.error,
        });
        throw new SmtpError(result.error || "Failed to send email");
    }

    return result.messageId!;
};

