// Copyright (c) 2026 Raj
// See LICENSE for details.

import { Session } from "@velocity/database";
import { VelocityError } from "@velocity/error-handler"
import jwt, { JwtPayload } from "jsonwebtoken";

const Velocity_Access_Token = process.env.VELOCITY_ACCESS_TOKEN!;

interface userJWTPayload extends JwtPayload {
    sid: string;
    sub: string;
}

export class AuthMiddleware {
    public static authMiddleware = async (token: string): Promise<{ sid: string, userId: string }> => {
        if (!token) {
            throw new VelocityError({ statusCode: 401, message: "Token is Envalid" });
        }

        if (!Velocity_Access_Token) {
            throw new VelocityError({ statusCode: 500, message: "Access Secret fails" });
        }

        const payload = jwt.verify(token, Velocity_Access_Token) as userJWTPayload;

        if (!payload) {
            throw new VelocityError({ statusCode: 401, message: "Token is Envalid" });
        }

        const session = await Session.findOne({
            _id: payload.sid,
            userId: payload.sub,
            expireAt: { $gt: Date.now() },
            revoked: null
        });


        if (!session) {
            throw new VelocityError({ statusCode: 401, message: "Session is Expired " });
        }

        return { sid: payload.sid, userId: payload.sub }
    }
}