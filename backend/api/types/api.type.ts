// Copyright (c) 2026 Raj
// See LICENSE for details.

import { Response } from "express";

export function sendResponse(res: Response, status: number, response: { success: 'true' | 'false', status: number, message: string, data?: any }) {
    const { success, message, data } = response;

    res.status(status).json({ success, message, data: data ?? {} });
}