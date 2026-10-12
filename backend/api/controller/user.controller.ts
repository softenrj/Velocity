// Copyright (c) 2026 Raj
// See LICENSE for details.

import { User } from "@velocity/database";
import { VelocityError } from "@velocity/error-handler";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;

    if (!userId) {
        throw new VelocityError({ statusCode: 401, message: "UnAuthorized Access" });
    }

    const user = await User.findById(userId);
    res.status(200).json({ success: true, message: "Successfully fetched user", data: { user: user } });
}