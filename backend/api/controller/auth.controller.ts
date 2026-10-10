// Copyright (c) 2026 Raj
// See LICENSE for details.

import { Request, Response } from "express";
import { AuthLogin, AuthRefreshToken, AuthRegester } from "@velocity/core";
import { VelocityError } from "@velocity/error-handler";

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const p = await AuthLogin.login(email, password);

    if (!p) {
        throw new VelocityError({ statusCode: 400, message: "Something Went Wrong" });
    }

    res.cookie("refreshToken", p.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: "strict",
        path: "/auth",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({ success: true, message: "Successfully Login", data: { user: p.user, accessToken: p.accessToken } });
}

export const regester = async (req: Request, res: Response): Promise<void> => {
    const { email, password, username } = req.body;

    const p = await AuthRegester.regester({ username, email, password });

    if (!p) {
        throw new VelocityError({ statusCode: 400, message: "Something Went Wrong" });
    }

    res.cookie("refreshToken", p.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: "strict",
        path: "/auth",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({ success: true, message: "Successfully Register", data: { user: p.user, accessToken: p.accessToken } });
}

export const refresh = async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;

    const refreshToken = cookies.refreshToken ?? null;

    if (!refreshToken) {
        throw new VelocityError({ statusCode: 400, message: "Envalid Refresh Token " });
    }

    const p = await AuthRefreshToken.refresh(refreshToken);

    if (!p) {
        throw new VelocityError({ statusCode: 400, message: "Something Went Wrong" });
    }


    res.status(200).json({ success: true, message: "Successfully Generate New Access Token", data: { accessToken: p } });
}