// Handle "are you alive?" requests
// Returns: status, service name, version
import { Request, Response } from "express";

export const getHealth = (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
        service: "email-service",
        version: "v1",
    });
};
