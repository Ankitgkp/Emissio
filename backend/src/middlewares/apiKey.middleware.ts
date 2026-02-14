import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import { AuthenticationError, AuthorizationError } from "../errors/AppError";

export const requireApiKey = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
        throw new AuthenticationError("Missing API key");
    }
    if (apiKey !== env.API_KEY) {
        throw new AuthorizationError("Invalid API key");
    }
    next();
};
