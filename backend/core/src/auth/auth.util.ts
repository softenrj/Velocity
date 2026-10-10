// Copyright (c) 2026 Raj
// See LICENSE for details.

import { VelocityError } from "@velocity/error-handler";
import * as crypto from "node:crypto";
import jwt from "jsonwebtoken";

const Velocity_Access_Token = process.env.VELOCITY_ACCESS_TOKEN!;
const Velocity_Refresh_Token = process.env.VELOCITY_Refresh_TOKEN!;

class AuthUtils {
    public static generateAccessToken = (sid: string, userId: string) => {
        if (!Velocity_Access_Token) {
            throw new VelocityError({ statusCode: 500, message: "Unable to Generate Access Token" });
        }
        const token = jwt.sign({ sid, sub: userId }, Velocity_Access_Token, { expiresIn: "10m", issuer: "velocity", audience: "velocity-client", subject: userId.toString() });
        return token;
    }

    public static verifyAccessToken = (token: string) => {
        if (!Velocity_Access_Token) {
            throw new VelocityError({ statusCode: 500, message: "Unable to Verify Access Token" });
        }
        const verifiedPayload = jwt.verify(token, Velocity_Access_Token, { issuer: "velocity", audience: "velocity-client" });
        return verifiedPayload as { sid: string, sub: string };
    }

    public static generateRefreshToken = () => {
        if (!Velocity_Refresh_Token) {
            throw new VelocityError({ statusCode: 500, message: "Unable to Generate Refresh Token" });
        }
        const token = crypto.randomBytes(32).toString("hex");
        return token;
    }

    public static verifyRefreshToken = (token: string) => { };

    public static genHash = (token: string) => {
        return crypto.createHash("sha256").update(token).digest("hex");
    }
}

export default AuthUtils;