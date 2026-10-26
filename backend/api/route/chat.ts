// Copyright (c) 2026 Raj
// See LICENSE for details.

import { Router } from "express";
import { isAuthorized } from "../middleware/auth.middleware.js";
import * as ChatController from "../controller/chat.controller.js";

const router: Router = Router();

router.post('/api-key/:id', isAuthorized, ChatController.setApiKey)
router.post('/api-key/rotate/:id', isAuthorized, ChatController.rotateApiKey)
router.get('/api-keys', isAuthorized, ChatController.getApiKeys)
router.get('/api-keys/:provider', isAuthorized, ChatController.getApiKey)
router.delete('/api-keys/:provider', isAuthorized, ChatController.deleteApiKey)

router.post('/chat', isAuthorized, ChatController.chatV1)
router.post('/chat/:repositoriesId', isAuthorized, ChatController.chatV1)
router.get('/chat/stream/validate/:jobId', isAuthorized, ChatController.validateSSEEvent)
router.get('/chat/stream/:jobId', ChatController.chatStream) // TODO isSSE Auth
router.get('/repositories', isAuthorized, ChatController.getRepositories)
router.get('/repositories/:repositoriesId', isAuthorized, ChatController.getRepositorie)

export { router as chatRouter }