// Copyright (c) 2026 Raj
// See LICENSE for details.

import { Router } from "express";
import * as AuthController from "../controller/auth.controller.js";

const router = Router();

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.regester);
router.get('/auth/refresh', AuthController.refresh);

export const userRouter: Router = router;