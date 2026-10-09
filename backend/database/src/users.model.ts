// Copyright (c) 2026 Raj
// See LICENSE for details.

import mongoose, { Schema } from "mongoose";

export enum AuthType {
    TOKEN = "jwt-token"
}

export interface IUser {
    userId: mongoose.Types.ObjectId;
    userName: string;
    email: string;
    password: string;
    authType: AuthType;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    userId: { type: Schema.ObjectId, required: true, index: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    authType: { type: String, enum: Object.values(AuthType), required: true, default: AuthType.TOKEN }
}, { timestamps: true });

export const userModel = mongoose.model<IUser>('users', userSchema);