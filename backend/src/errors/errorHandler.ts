import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import { logger } from "../utils/logger";

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {

    if (err instanceof AppError) {
        logger.warn("handled_error", {
            type: err.constructor.name,
            statusCode: err.statusCode,
            message: err.message,
        });

        res.status(err.statusCode).json({
            success: false,
            error: err.message,
        });
        return;
    }

    logger.error("unhandled_error", {
        type: err.constructor.name,
        message: err.message,
        stack: err.stack,
    });

    res.status(500).json({
        success: false,
        error: "Internal server error",
    });
};
