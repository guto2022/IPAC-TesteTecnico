import { Response } from "express";

export function internalServerError(res: Response, error: unknown) {
    console.error(error);

    return res.status(500).json({
        error: "Internal server error"
    });
}