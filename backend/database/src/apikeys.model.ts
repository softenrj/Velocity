// Copyright (c) 2026 Raj
// See LICENSE for details.

import mongoose from "mongoose";

export enum AIProvider {
    GOOGLE = "google",
    // OPENAI = "openai",
    // ANTRHOPIC = "anthropic",
    // COHERE = "cohere",
}

export interface IApiKey {
    userId: mongoose.Types.ObjectId;
    provider: AIProvider;
    encryptedKey: string;
    isRevoked: boolean;
    algorithm: string;
    iv: string;
    authTag: string;
    createdAt: string;
    updatedAt: string;
}

const ApiKeySchema = new mongoose.Schema<IApiKey>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    provider: { type: String, enum: AIProvider, required: true },
    encryptedKey: { type: String, required: true },
    isRevoked: { type: Boolean, default: false },
    algorithm: { type: String, required: true },
    iv: { type: String, required: true },
    authTag: { type: String, required: true },
}, { timestamps: true });

export const ApiKeys = mongoose.model<IApiKey>("apikeys", ApiKeySchema);