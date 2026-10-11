// Copyright (c) 2026 Raj
// See LICENSE for details.

import { VelocityError } from "@velocity/error-handler";
import { Session, User } from "@velocity/database";
import bcrypt from "bcrypt";
import AuthUtils, { SESSION_DURATION } from "../auth.util.js";

export class AuthLogin {
    public static login = async (email: string, password: string, rm: boolean) => {
        if (!email || !password) {
            throw new VelocityError({ statusCode: 400, message: "Email and Password is Required" });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            throw new VelocityError({ statusCode: 402, message: "User not found" });
        }


        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new VelocityError({ statusCode: 401, message: "Envalid Password" });
        }

        const refressToken = AuthUtils.generateRefreshToken();
        const refHash = AuthUtils.genHash(refressToken);

        const duration = rm ? SESSION_DURATION.persistent : SESSION_DURATION.temporary;

        const session = await Session.create({
            userId: user._id,
            refreshHash: refHash,
            revoked: null,
            expireAt: new Date(Date.now() + duration)
        })

        const accessToken = AuthUtils.generateAccessToken(String(session._id), String(user._id));

        return { accessToken, refressToken, user };
    }
}