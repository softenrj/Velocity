// Copyright (c) 2026 Raj
// See LICENSE for details.

import mongoose, { Schema } from "mongoose";

export interface ISession {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    refreshHash: string;
    revoked: null | Date;
    expireAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const sessionSchema = new mongoose.Schema<ISession>({
    userId: { type: Schema.ObjectId, required: true, ref: "users" },
    refreshHash: { type: String, required: true },
    revoked: { type: Date, default: null },
    expireAt: { type: Date, required: true, default: 7 * 24 * 60 * 60 * 1000 }
}, { timestamps: true })

export const sessionModel = mongoose.model<ISession>('sessions', sessionSchema);