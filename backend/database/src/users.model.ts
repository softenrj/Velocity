// Copyright (c) 2026 Raj
// See LICENSE for details.

import mongoose, { Schema } from "mongoose";

export enum AuthType {
    TOKEN = "jwt-token"
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}

export enum UserPackage {
    DEFAULT = 'default',
    PREMIUM = 'premium',
    ELITE = 'elite'
}

export interface IUser {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    authType: AuthType;
    role: UserRole;
    package: UserPackage;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: UserRole.USER },
    package: { type: String, required: true, default: UserPackage.DEFAULT },
    authType: { type: String, enum: Object.values(AuthType), required: true, default: AuthType.TOKEN }
}, { timestamps: true });

export const userModel = mongoose.model<IUser>('users', userSchema);