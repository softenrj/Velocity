// Copyright (c) 2026 Raj
// See LICENSE for details.

import { Session } from "@velocity/database";
import AuthUtils from "../auth.util.js"
import { VelocityError } from "@velocity/error-handler";

export class AuthRefreshToken {
    public static refresh = async (refreshToken: string) => {
        const hash = AuthUtils.genHash(refreshToken);

        const session = await Session.findOne({
            refreshHash: hash,
            revoked: null,
            expireAt: { $gt: Date.now() }
        });

        if (!session) {
            throw new VelocityError({ statusCode: 401, message: "Session is Expired" });
        }

        const token = AuthUtils.generateAccessToken(String(session._id), String(session.userId));
        return token;
    }
}