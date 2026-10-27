// Copyright (c) 2026 Raj
// See LICENSE for details.
import { AIProvider, ApiKeys } from "@velocity/database";
import { VelocityError } from "@velocity/error-handler";
import AESGCM from "@velocity/aes-gcm";
import GOOGLE_ENGINE from "./google.engin.js";

const AI_PROVIDER_ENGINE = {
    [AIProvider.GOOGLE]: GOOGLE_ENGINE
} satisfies Record<AIProvider, Object>;

class AI_ENGINE_RJ {
    private readonly keyCache = new Map<string, { key: string; expiresAt: number }>();

    private readonly CACHE_TTL = 60_000; // 60 seconds
    private readonly MAX_CACHE_SIZE = 100;

    private getCacheKey = (userId: string, provider: AIProvider) => `${userId}:${provider}`;

    private getKey = async (userId: string, provider: AIProvider): Promise<string> => {
        const cacheKey = this.getCacheKey(userId, provider);
        const cached = this.keyCache.get(cacheKey);

        if (cached && cached.expiresAt > Date.now()) {
            return cached.key;
        }

        this.keyCache.delete(cacheKey);

        const api = await ApiKeys.findOne({ userId, provider, isRevoked: false }, { iv: 1, authTag: 1, encryptedKey: 1 });

        if (!api) throw new VelocityError({ statusCode: 400, message: "Please SetUp API Key first" });
        const key = AESGCM.decrypt(api.iv, api.authTag, api.encryptedKey);

        if (this.keyCache.size >= this.MAX_CACHE_SIZE) {
            const oldestKey = this.keyCache.keys().next().value;

            if (oldestKey !== undefined) {
                this.keyCache.delete(oldestKey);
            }
        }

        this.keyCache.set(cacheKey, { key, expiresAt: Date.now() + this.CACHE_TTL });
        return key;
    }

    private selectModel = async (userId: string, provider: AIProvider) => {
        const API_KEY = await this.getKey(userId, provider);

        const engineClass = AI_PROVIDER_ENGINE[provider];

        if (!engineClass) throw new VelocityError({ statusCode: 400, message: "Invalid Provider or Provider is Not Available at this Moment" });
        const engine = new engineClass(API_KEY);
        return engine;
    }

    public generateResponse = async (userId: string, jobId: string, prompt: string, provider?: AIProvider,) => {
        if (typeof provider === "undefined" || !provider) {
            // TODO AUTO SELECT
            return;
        }

        const engine = await this.selectModel(userId, provider);
        engine.getStreamResponse(jobId, prompt)
    }
}

export const AiEngine = new AI_ENGINE_RJ();