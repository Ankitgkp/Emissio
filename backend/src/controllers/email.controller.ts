// Accept request, delegate to service, return the result
import { Request, Response } from "express";
import { sendEmail as sendEmailService } from "../services/email.service";

export const sendEmail = async (req: Request, res: Response) => {
    const { to, subject, body } = req.body;
    const result = await sendEmailService({ to, subject, body });

    res.status(200).json(result);
};