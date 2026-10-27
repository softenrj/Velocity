// Copyright (c) 2026 Raj
// See LICENSE for details.

import { Request, Response } from "express";
import { VelocityError } from "@velocity/error-handler";
import { InitializeChat, aiApiKeyService } from "@velocity/core";
import { AIProvider, Repositories } from "@velocity/database";
import mongoose from "mongoose";
import { sendResponse } from "../types/api.type.js";
import { SSE_EVENT_KEYS, sseManager } from "@velocity/sse";
import { AiEngine } from "@velocity/ai-engine";

export const chatV1 = async (req: Request, res: Response) => {
    const userId = req.userId;
    const { prompt } = req.body;
    const repositoriesId = req.params.repositoriesId;

    if (!userId) {
        throw new VelocityError({ statusCode: 401, message: "UnAuthorized Access" });
    }

    let repositorie = null;

    if (!repositoriesId) {
        repositorie = await InitializeChat.initilize(userId, prompt);
    }

    // SSE event
    const jobId = sseManager.createJobId();
    await AiEngine.generateResponse(userId, jobId, prompt, AIProvider.GOOGLE);

    res.status(200).json({ success: true, message: "Successfully generated chat", data: { repositorie, jobId: jobId } })
}

export const validateSSEEvent = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    const jobId = req.params?.jobId as string;
    const key = req.query.key as SSE_EVENT_KEYS;

    if (!userId) {
        throw new VelocityError({ statusCode: 401, message: "UnAuthorized Access" });
    }

    if (!jobId) throw new VelocityError({ statusCode: 400, message: "Evalid or Missing Job Id" });

    if (!Object.values(SSE_EVENT_KEYS).includes(key)) throw new VelocityError({ statusCode: 401, message: "Envalid Request" });

    sseManager.setAuthUser(userId, key, jobId);

    sendResponse(res, 200, { success: 'true', status: 200, message: 'Successfully validated SSE event' })
}

export const chatStream = async (req: Request, res: Response): Promise<void> => {
    // SSE event
    const jobId = req.params?.jobId as string;
    const key = req.query.key as SSE_EVENT_KEYS;

    if (!jobId) throw new VelocityError({ statusCode: 400, message: "Evalid or Missing Job Id" });

    if (!Object.values(SSE_EVENT_KEYS).includes(key)) throw new VelocityError({ statusCode: 400, message: "Envalid Request" });

    if (!sseManager.isAuthUser(jobId, key)) throw new VelocityError({ statusCode: 403, message: "Not Allowed to Access this Stream" });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();
    sseManager.addUser(jobId, res);

    res.on("close", () => sseManager.removeUser(jobId));
}

export const getRepositories = async (req: Request, res: Response) => {
    const userId = req.userId;

    const { limit = 10, q, cursorId, cursorTargetTime } = req.query;

    if (!userId) {
        throw new VelocityError({ statusCode: 401, message: "UnAuthorized Access" });
    }

    const query: any = { userId };

    if (q) query.title = { $regex: q, $options: "i" };
    if (cursorId) query._id = { $lt: new mongoose.Types.ObjectId(String(cursorId)) };
    if (cursorTargetTime) query.createdAt = { $lt: new Date(Number(cursorTargetTime)) };

    const repositories = await Repositories.find(query).sort({ createdAt: -1 }).limit(Number(limit));
    res.status(200).json({ success: true, message: "Successfully fetched repositories", data: { repositories } })
}

export const getRepositorie = async (req: Request, res: Response) => {
    const userId = req.userId;
    const { repositoriesId } = req.params;

    if (!userId) {
        throw new VelocityError({ statusCode: 401, message: "UnAuthorized Access" });
    }

    if (!repositoriesId) {
        throw new VelocityError({ statusCode: 400, message: "Repositories Id is required" });
    }

    const repositorie = await Repositories.findById(repositoriesId);
    if (!repositorie || repositorie.userId.toString() !== userId) {
        throw new VelocityError({ statusCode: 404, message: "Repositories Not Found" });
    }

    res.status(200).json({ success: true, message: "Successfully fetched repositories", data: { repositorie } })
}

export const setApiKey = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;

    if (!userId) {
        throw new VelocityError({ statusCode: 401, message: "UnAuthorized Access" });
    }

    const encryptedKey = req.params.id as string;
    const provider = req.body.provider;

    if (!encryptedKey) {
        throw new VelocityError({ statusCode: 400, message: "Api Key is required" });
    }

    if (!provider || Object.keys(AIProvider).includes(provider)) throw new VelocityError({ statusCode: 400, message: "Please Select Valid Provider" });

    const apikey = Buffer.from(encryptedKey, "base64").toString("utf-8");

    const api = await aiApiKeyService.setApiKey(userId, provider, apikey);
    sendResponse(res, 200, { success: "true", status: 200, message: "Api Key is Set successfully", data: api });
}

export const rotateApiKey = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;

    if (!userId) {
        throw new VelocityError({ statusCode: 401, message: "UnAuthorized Access" });
    }

    const encryptedKey = req.params.id as string;

    const provider = req.body.provider;

    if (!encryptedKey) {
        throw new VelocityError({ statusCode: 400, message: "Api Key is required" });
    }

    if (!provider || Object.keys(AIProvider).includes(provider)) throw new VelocityError({ statusCode: 400, message: "Please Select Valid Provider" });


    const apikey = Buffer.from(encryptedKey, "base64").toString("utf-8");
    const api = await aiApiKeyService.rotateKey(userId, provider, apikey);
    sendResponse(res, 200, { success: "true", status: 200, message: "Api Key is Rotate successfully", data: api });
}

export const getApiKeys = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;

    if (!userId) {
        throw new VelocityError({ statusCode: 401, message: "UnAuthorized Access" });
    }

    const apis = await aiApiKeyService.getAllApiKeys(userId);
    sendResponse(res, 200, { success: "true", status: 200, message: "Api Keys is fetched successfully", data: apis });
}

export const deleteApiKey = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;

    if (!userId) {
        throw new VelocityError({ statusCode: 401, message: "UnAuthorized Access" });
    }

    const provider = req.params.provider as AIProvider;

    if (!provider || Object.keys(AIProvider).includes(provider)) throw new VelocityError({ statusCode: 400, message: "Please Select Valid Provider" });

    const d = await aiApiKeyService.deleteKey(userId, provider);
    if (d.deletedCount == 0) {
        res.status(200).json({ success: true, message: "There is no Key with that provider to delete", data: null });
        return;
    }

    res.status(200).json({ success: true, message: "Successfully removed Api key from our system", data: null });
}

export const getApiKey = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;

    if (!userId) {
        throw new VelocityError({ statusCode: 401, message: "UnAuthorized Access" });
    }

    const provider = req.params.provider as AIProvider;

    if (!provider || Object.keys(AIProvider).includes(provider)) throw new VelocityError({ statusCode: 400, message: "Please Select Valid Provider" });

    const api = await aiApiKeyService.getApiKey(userId, provider);
    sendResponse(res, 200, { success: "true", status: 200, message: "Api Key is fetched successfully", data: api });
}