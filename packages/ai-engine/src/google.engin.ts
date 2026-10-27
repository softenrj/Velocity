// Copyright (c) 2026 Raj
// See LICENSE for details.

import { GoogleGenAI } from "@google/genai";
import { sseManager } from "@velocity/sse";

class GOOGLE_ENGINE {
    private key: string;
    constructor(key: string) {
        this.key = key;
    }

    public getStreamResponse = async (jobId: string, prompt: string) => {
        const client = new GoogleGenAI({ apiKey: this.key });
        let thoughts = "";
        let answer = "";

        const stream = await client.interactions.create({
            model: "gemini-3.1-flash-lite",
            input: prompt,
            generation_config: {
                thinking_summaries: "auto"
            },
            stream: true
        });

        for await (const event of stream) {
            if (event.event_type === "step.delta") {
                if (event.delta.type === "thought_summary") {
                    if (!thoughts) console.log("Thinking...");
                    if (event.delta.content?.type === "text") {
                        const text = event.delta.content.text;
                        process.stdout.write(`[Thought] ${text}`);
                        thoughts += text;
                        sseManager.sendEvent(jobId, 'thought', text);
                    }
                } else if (event.delta.type === "text" && event.delta.text) {
                    if (!answer) console.log("\nAnswer:");
                    process.stdout.write(event.delta.text);
                    answer += event.delta.text;
                    sseManager.sendEvent(jobId, 'answer', answer);
                }
            }

        }

    }
}

export default GOOGLE_ENGINE;