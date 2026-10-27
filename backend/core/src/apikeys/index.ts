// Copyright (c) 2026 Raj
// See LICENSE for details.

import { AIProvider, ApiKeys } from "@velocity/database";
import AESGCM from "@velocity/aes-gcm";
import { VelocityError } from "@velocity/error-handler";

class AI_API_KEY {
    public setApiKey = async (userId: string, provider: AIProvider, key: string) => {
        if (!userId || !provider || !key) {
            throw new Error("Missing required fields");
        }


        const existingApiKey = await ApiKeys.findOne({
            userId,
            provider,
            isRevoked: false
        });

        if (existingApiKey) {
            existingApiKey.isRevoked = true;
            await existingApiKey.save();
        }

        const encryptedKey = AESGCM.encrypt(key);

        const apiKey = await ApiKeys.create({
            userId,
            provider,
            encryptedKey: encryptedKey.encryptedData,
            iv: encryptedKey.iv,
            algorithm: "aes-256-gcm",
            authTag: encryptedKey.authTag,
            isRevoked: false
        });

        return { ...apiKey.toObject(), iv: null, algorithm: null, authTag: null, encryptedKey: null };
    }

    public resolveApiKey = async (userId: string, provider?: AIProvider): Promise<{ provider: AIProvider, key: string }> => {
        // const _api: { provider: AIProvider, key: string } = null;
        if (typeof provider === "undefined" || !provider) {
            // auto select flow
            const apikeys = await ApiKeys.findOne({ userId, isRevoked: false });

            if (!apikeys) {
                throw new VelocityError({ statusCode: 403, message: "Please Add API Key" });
            }

            const key = AESGCM.decrypt(apikeys.iv, apikeys.authTag, apikeys.encryptedKey);
            return { provider: apikeys.provider, key };
        }

        const apiKey = await ApiKeys.findOne({ userId, provider, isRevoked: false });
        if (!apiKey) throw new VelocityError({ statusCode: 400, message: "Envalid Provider or Api Key is Currupted" });

        const key = AESGCM.decrypt(apiKey.iv, apiKey.authTag, apiKey.encryptedKey);

        return { provider, key: key };
    }

    public rotateKey = async (userId: string, provider: AIProvider, key: string) => {
        // const api = await ApiKeys.findOne({ userId, provider, isRevoked: false });

        // if (!api) throw new VelocityError({ statusCode: 403, message: "Envalid Provider or Unable to Access Api key"});
        // api.isRevoked = true;
        // api.save();

        return this.setApiKey(userId, provider, key);
    }

    public getApiKey = async (userId: string, provider: AIProvider) => {
        const api = await ApiKeys.findOne({ userId, provider, isRevoked: false });

        if (!api) throw new VelocityError({ statusCode: 403, message: "Envalid Provider or Unable to Access Api key" });
        const key = AESGCM.decrypt(api.iv, api.authTag, api.encryptedKey);
        return { ...api, iv: null, algorithm: null, authTag: null, encryptedKey: null, key: key };
    }

    public getAllApiKeys = async (userId: string) => {
        const apis = await ApiKeys.find({ userId, isRevoked: false });

        if (!apis) throw new VelocityError({ statusCode: 403, message: "Envalid Provider or Unable to Access Api key" });
        const enrichedKeys = apis.map((api) => ({ ...api, iv: null, algorithm: null, authTag: null, encryptedKey: null, key: AESGCM.decrypt(api.iv, api.authTag, api.encryptedKey) }))
        return enrichedKeys;
    }

    public deleteKey = async (userId: string, provider: AIProvider) => {
        const d = await ApiKeys.deleteOne({ userId, provider });
        return d;
    }


}

export const aiApiKeyService = new AI_API_KEY;