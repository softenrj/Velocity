// Copyright (c) 2026 Raj
// See LICENSE for details.

import { VelocityError } from "@velocity/error-handler";
import { Session, User } from "@velocity/database";
import bcrypt from "bcrypt";
import AuthUtils from "../auth.util.js";

const SALT_ROUND = process.env.SALT_ROUND ?? 10;

export class AuthLogin {
    public static login = async (email: string, password: string) => {
        try {
            if (!email || !password) {
                throw new VelocityError({ statusCode: 400, message: "Email and Password is Required" });
            }

            const user = await User.findOne({ email: email });

            if (!user) {
                throw new VelocityError({ statusCode: 402, message: "User not found" });
            }

            const hashPassword = await bcrypt.hash(password, SALT_ROUND);

            const match = await bcrypt.compare(hashPassword, user.password);

            if (!match) {
                throw new VelocityError({ statusCode: 401, message: "Envalid Password" });
            }

            const refressToken = AuthUtils.generateRefreshToken();
            const refHash = AuthUtils.genHash(refressToken);

            const session = await Session.create({
                userId: user._id,
                refreshHash: refHash,
                revoked: null,
                expireAt: new Date(Date.now() * 7 * 24 * 60 * 60 * 1000)
            })

            const accessToken = AuthUtils.generateAccessToken(String(session._id), String(user._id));

            return { accessToken, refressToken, user };
        } catch (error) {
            throw new VelocityError({ message: "Login Failed" });
        }
    }
}