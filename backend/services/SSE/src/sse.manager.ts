// Copyright (c) 2026 Raj
// See LICENSE for details.
import { Response } from "express";
import * as crypto from "node:crypto";

export enum SSE_EVENT_KEYS {
    CHAT = "chatv1:generated"
}

class SSE_MANAGER {
    private liveEvent: Map<string, Response> = new Map();
    private autorizeUser: Map<string, string> = new Map();

    public createJobId = () => {
        const randomId = crypto.randomBytes(16).toString("hex");
        return randomId;
    }

    public addUser = (jobId: string, res: Response) => {
        this.liveEvent.set(jobId, res);
    }

    public removeUser = (jobId: string) => {
        this.liveEvent.delete(jobId);
        this.autorizeUser.delete(jobId);
    }

    public getUserJobId = (jobId: string, key: SSE_EVENT_KEYS): string | undefined => {
        const compositeKey = jobId;
        return this.autorizeUser.get(compositeKey);
    }

    public setAuthUser = (userId: string, key: SSE_EVENT_KEYS, jobId: string) => {
        const compositeKey = jobId;
        this.autorizeUser.set(compositeKey, key);
    }


    public isAuthUser = (jobId: string, key: SSE_EVENT_KEYS): boolean => {
        const compositeKey = jobId;
        return this.autorizeUser.has(compositeKey);
    }

    public sendEvent = (jobId: string, event: string, data: string) => {
        const client = this.liveEvent.get(jobId);

        if (!client) return null;

        client.write(`event: ${event}\n`)
        client.write(`data: ${data}\n\n`);
        return;
    }

    public completeJob = (jobId: string, event: string) => {
        const client = this.liveEvent.get(jobId);

        if (client && !client.destroyed && !client.writableEnded) {
            client.write(`event: ${event}\n`)
            client.write(`data: DONE\n\n`);
            client.end();
        }

        this.removeUser(jobId);
    }
}

export default new SSE_MANAGER();