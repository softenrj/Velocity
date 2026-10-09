// Copyright (c) 2026 Raj
// See LICENSE for details.

import express from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import { connectMongooseDatabase } from "@velocity/database/config";
import dns from "dns";

dns.setServers(['1.1.1.1', '8.8.8.8']);

const PORT = process.env.PORT ?? 8000;


const app = express();

app.use(morgan("dev"));
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

app.use(compression());
app.use(cors({
    origin: (origin, cb) => {
        if (!origin) {
            return cb(null, false);
        }

        if (![""].includes(origin)) {
            return cb(new Error("[velocity cors] origin is not allowed!"), false);
        }

        return origin;
    }
}));

connectMongooseDatabase();

app.listen(PORT, () => {
    console.log("[velocity] server is live at Port: ", PORT);
})