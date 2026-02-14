
import { send } from "../infrastructure/smtp/smtpClient";
import { SmtpError } from "../errors/AppError";

interface EmailData {
    to: string;
    subject: string;
    content: string;
}

export const sendEmail = async (data: EmailData): Promise<string> => {
    const result = await send(data);

    if (!result.success) {
        throw new SmtpError(result.error || "Failed to send email");
    }

    return result.messageId!;
};

