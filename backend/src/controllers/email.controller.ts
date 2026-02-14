import { Request, Response, NextFunction } from "express";
import { sendEmail as sendEmailService } from "../services/email.service";

export const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { to, subject, content } = req.body;
        const messageId = await sendEmailService({ to, subject, content });

        res.status(200).json({
            success: true,
            message: `Email sent successfully (ID: ${messageId})`,
        });
    } catch (err) {
        next(err);
    }
};