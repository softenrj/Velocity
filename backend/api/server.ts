// Copyright (c) 2026 Raj
// See LICENSE for details.

import express from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import { connectMongooseDatabase } from "@velocity/database/config";
import dns from "dns";
import { velocityErrorHandler } from "@velocity/error-handler";
import cookieparser from "cookie-parser";
import { defaultRouter } from "./route.js";

dns.setServers(['1.1.1.1', '8.8.8.8']);

const PORT = process.env.PORT ?? 8000;


const app = express();

app.use(morgan("dev"));
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())

app.use(compression());

const allowedOrigins = ["http://localhost:3000", "https://velocitytest.vercel.app"];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed for this origin"));
        }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));

connectMongooseDatabase();

app.use('/api/v1', defaultRouter);

app.use(velocityErrorHandler);

app.listen(PORT, () => {
    console.log("[velocity] server is live at Port: ", PORT);
})