// Copyright (c) 2026 Raj
// See LICENSE for details.

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export class VelocityError extends Error {
    statusCode: number;

    constructor({ statusCode, message }: { statusCode?: number, message?: string }) {
        const _m = message ?? "Internal Server Error";
        super(_m);
        this.statusCode = statusCode ?? 500;
        this.name = "velocity Error";

        Error.captureStackTrace(this, VelocityError);
    }
}

const velocityErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error.message)

    if (res.headersSent) {
        return next(error);
    }

    const statusCode = error instanceof VelocityError ? error.statusCode : 500;
    const message = error?.message ?? "Internal Server Error";

    res.status(statusCode).json({ success: false, message: message, data: {} });
}

export default velocityErrorHandler as ErrorRequestHandler;