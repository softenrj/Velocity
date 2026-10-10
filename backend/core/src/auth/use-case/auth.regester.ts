// Copyright (c) 2026 Raj
// See LICENSE for details.

import { Session, User } from "@velocity/database";
import { VelocityError } from "@velocity/error-handler";
import bcrypt from "bcrypt";
import AuthUtils from "../auth.util.js";

const SALT_ROUND = process.env.SALT_ROUND ?? 10;

export class AuthRegester {
    public static regester = async ({ username, email, password }: { username: string, email: string, password: string }) => {
        try {
            if (!username || !email || !password) {
                throw new VelocityError({ statusCode: 400, message: "UserNmae, Email and Password is Required" });
            }

            let user = await User.exists({ email });

            if (user) {
                throw new VelocityError({ statusCode: 400, message: "Email is Already Exists" });
            }

            const hash = await bcrypt.hash(password, SALT_ROUND);

            user = await User.create({ username: username, email, password: hash });

            const refressToken = AuthUtils.generateRefreshToken();
            const refHash = AuthUtils.genHash(refressToken);

            const session = await Session.create({
                userId: user._id,
                refreshHash: refHash,
                revoked: null,
                expireAt: new Date(Date.now() * 7 * 24 * 60 * 60 * 1000)
            })

            const accessToken = AuthUtils.generateAccessToken(String(session._id), String(user._id));


            return { userId: user._id, accessToken, refressToken, user };
        } catch (error) {
            throw new VelocityError({});
        }
    }
}