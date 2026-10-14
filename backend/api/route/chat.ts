// Copyright (c) 2026 Raj
// See LICENSE for details.

import { Router } from "express";
import { isAuthorized } from "../middleware/auth.middleware.js";
import * as ChatController from "../controller/chat.controller.js";

const router: Router = Router();

router.post('/chatv1/chat', isAuthorized, ChatController.chatV1)
router.post('/chatv1/chat/:repositoriesId', isAuthorized, ChatController.chatV1)
router.get('/chatv1/chat/stream/validate/:jobId', isAuthorized, ChatController.validateSSEEvent)
router.get('/chatv1/chat/stream/:jobId', ChatController.chatStream) // TODO isSSE Auth
router.get('/chatv1/repositories', isAuthorized, ChatController.getRepositories)
router.get('/chatv1/repositories/:repositoriesId', isAuthorized, ChatController.getRepositorie)

export { router as chatRouter }