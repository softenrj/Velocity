// Copyright (c) 2026 Raj
// See LICENSE for details.

import { Router, Request, Response } from "express";
import { userRouter } from "./route/user.js";

const router = Router();

router.use('/user', userRouter);

router.use((req: Request, res: Response) => {
    res.status(200).json({ success: true, message: "Welcome to Velocity Api", data: {} });
})

export const defaultRouter = router as Router;