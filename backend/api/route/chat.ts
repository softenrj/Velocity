// Copyright (c) 2026 Raj
// See LICENSE for details.

import { Router } from "express";
import { isAuthorized } from "../middleware/auth.middleware.js";
import { chatV1, getRepositories, getRepositorie } from "../controller/chat.controller.js";

const router: Router = Router();

router.post('/chatv1/chat', isAuthorized, chatV1)
router.post('/chatv1/chat/:repositoriesId', isAuthorized, chatV1)
router.get('/chatv1/repositories', isAuthorized, getRepositories)
router.get('/chatv1/repositories/:repositoriesId', isAuthorized, getRepositorie)

export { router as chatRouter }