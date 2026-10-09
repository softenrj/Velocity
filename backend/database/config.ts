// Copyright (c) 2026 Raj
// See LICENSE for details.

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

mongoose.Promise = Promise;

const connectMongooseDatabase = async () => {
    try {

        mongoose.connection.on("connected", () => {
            console.log("[Mongo] Connection established successfully.");
        })

        mongoose.connection.on('error', (err) => {
            console.error('[Mongo] Database error occurred:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('[Mongo] Connection lost! Attempting reconnection...');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('[Mongo] Successfully reconnected to the database.');
        });

        if (mongoose.connection.readyState === 1) {
            console.log("[Mongo] MongoDb is Already Connected");
            return;
        }

        if (!MONGO_URI || typeof MONGO_URI === 'undefined') {
            console.error("[Error] Mono uri is Envalid or undefined");
            return;
        }

        await mongoose.connect(MONGO_URI);
    } catch (error) {
        console.error("[Error] While Establishing the Connection with mongo server");
        return;
    }
}

export { connectMongooseDatabase };