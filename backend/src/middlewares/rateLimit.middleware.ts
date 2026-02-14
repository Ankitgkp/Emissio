import { Request, Response, NextFunction } from "express";
import { RateLimitError } from "../errors/AppError";

const MAX_REQUESTS = 10;       
const WINDOW_MS = 60 * 1000; 
const clients = new Map<string, { count: number; windowStart: number }>();

export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers["x-api-key"] as string;

    const now = Date.now();
    const client = clients.get(apiKey);
    if (!client || now - client.windowStart >= WINDOW_MS) {
        clients.set(apiKey, { count: 1, windowStart: now });
        next();
        return;
    }
    client.count++;
    if (client.count > MAX_REQUESTS) {
        const retryAfterSec = Math.ceil((client.windowStart + WINDOW_MS - now) / 1000);
        throw new RateLimitError(`Rate limit exceeded. Try again in ${retryAfterSec}s`);
    }
    next();
};
