import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/AppError";

const MAX_SUBJECT_LENGTH = 255;
const MAX_CONTENT_LENGTH = 50_000; // 50 kb

const isValidEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const validateEmailPayload = (req: Request, res: Response, next: NextFunction) => {
    const { to, subject, content } = req.body;
    if (!to || !subject || !content) {
        throw new ValidationError("Missing required fields: to, subject, and content are all required");
    }
    if (typeof to !== "string" || typeof subject !== "string" || typeof content !== "string") {
        throw new ValidationError("Invalid types: to, subject, and content must be strings");
    }
    if (!isValidEmail(to)) {
        throw new ValidationError("Invalid email address in 'to' field");
    }
    if (subject.length > MAX_SUBJECT_LENGTH) {
        throw new ValidationError(`Subject exceeds maximum length of ${MAX_SUBJECT_LENGTH} characters`);
    }
    if (content.length > MAX_CONTENT_LENGTH) {
        throw new ValidationError(`Content exceeds maximum size of ${MAX_CONTENT_LENGTH} characters`);
    }
    next();
};
