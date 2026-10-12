// Copyright (c) 2026 Raj
// See LICENSE for details.
import { AuthMiddleware } from "@velocity/core";
import { VelocityError } from "@velocity/error-handler";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            userId: string;
            sid: string;
        }
    }
}

export async function isAuthorized(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization?.startsWith('Bearer ')) {
        throw new VelocityError({ statusCode: 401, message: "Token is Not Attached" });
    }

    const Bearer = req.headers.authorization;
    const token = Bearer.split(" ")[1];
    const p = await AuthMiddleware.authMiddleware(token);

    req.userId = p.userId;
    req.sid = p.sid;
    next();
}