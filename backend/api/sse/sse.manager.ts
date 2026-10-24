// Copyright (c) 2026 Raj
// See LICENSE for details.
import { Response } from "express";

export enum SSE_EVENT_KEYS {
    CHAT = "chatv1:generated"
}

class SSE_MANAGER {
    private liveEvent: Map<string, Response> = new Map();
    private autorizeUser: Map<string, string> = new Map();

    public addUser = (jobId: string, res: Response) => {
        this.liveEvent.set(jobId, res);
    }

    public removeUser = (jobId: string) => {
        this.liveEvent.delete(jobId);
    }

    public getUserJobId = (userId: string, key: SSE_EVENT_KEYS): string | undefined => {
        const compositeKey = `${userId}:${key}`;
        return this.autorizeUser.get(compositeKey);
    }

    public setAuthUser = (userId: string, key: SSE_EVENT_KEYS, jobId: string) => {
        const compositeKey = `${userId}:${key}`;
        this.autorizeUser.set(compositeKey, jobId);
    }

    public isAuthUser = (userId: string, key: SSE_EVENT_KEYS): boolean => {
        const compositeKey = `${userId}:${key}`;
        return this.autorizeUser.has(compositeKey);
    }

    public sendEvent = (jobId: string, event: SSE_EVENT_KEYS, data: string) => {
        const client = this.liveEvent.get(jobId);

        if (!client) return null;

        client.write(`event: ${event}\n`)
        client.write(`data: ${data}\n\n`);
        return;
    }

    public completeJob = (jobId: string, event: SSE_EVENT_KEYS) => {
        const client = this.liveEvent.get(jobId);
        if (!client) return null;

        client.write(`event: ${event}\n`)
        client.write(`data: DONE\n\n`);
        client.end();
        this.removeUser(jobId);
        this.autorizeUser.delete(jobId);
    }
}

export default new SSE_MANAGER();