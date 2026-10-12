// Copyright (c) 2026 Raj
// See LICENSE for details.

import { Router } from "express";
import * as AuthController from "../controller/auth.controller.js";
import { isAuthorized } from "../middleware/auth.middleware.js";
import * as UserController from "../controller/user.controller.js";

const router = Router();

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.regester);
router.get('/auth/refresh', AuthController.refresh);
router.get('/auth/me', isAuthorized, UserController.getUser);

export const userRouter: Router = router;