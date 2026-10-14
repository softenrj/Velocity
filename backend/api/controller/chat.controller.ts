// Copyright (c) 2026 Raj
// See LICENSE for details.
import { Request, Response } from "express";
import { VelocityError } from "@velocity/error-handler";
import { InitializeChat } from "@velocity/core";
import { Repositories } from "@velocity/database";
import mongoose from "mongoose";
import { sendResponse } from "../types/api.type.js";

export const chatV1 = async (req: Request, res: Response) => {
    const userId = req.userId;
    const { prompt } = req.body;
    const chatId = req.params.chatId;

    if (!userId) {
        throw new VelocityError({ statusCode: 401, message: "UnAuthorized Access" });
    }

    let repositorie = null;
    let response = "yet empty";

    if (!chatId) {
        repositorie = await InitializeChat.initilize(userId, prompt);
    }
    // TODO - generate response
    // SSE event

    res.status(200).json({ success: true, message: "Successfully generated chat", data: { repositorie, jobId: "ram" } })
}

export const validateSSEEvent = async (req: Request, res: Response): Promise<void> => {
    // TODO validate using class

    sendResponse(res, 200, { success: 'true', status: 200, message: 'Successfully validated SSE event' })
}

export const chatStream = async (req: Request, res: Response): Promise<void> => {
    // TODO - generate response
    // SSE event


    sendResponse(res, 200, { success: 'true', status: 200, message: 'Successfully generated chat' })
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