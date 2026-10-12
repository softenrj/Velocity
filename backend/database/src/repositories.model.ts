// Copyright (c) 2026 Raj
// See LICENSE for details.

import mongoose from "mongoose";

export interface IRepositories {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    title: string;
    icon: string | null;
    pin: boolean;
    archieve: boolean;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const repositoriesSchema = new mongoose.Schema<IRepositories>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    title: { type: String, required: true },
    icon: { type: String, default: null },
    pin: { type: Boolean, default: false },
    archieve: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
}, { timestamps: true })

export const Repositories = mongoose.model<IRepositories>("repositories", repositoriesSchema)