// Copyright (c) 2026 Raj
// See LICENSE for details.

import { ApiResponse, postApi, VELOCITY_CHAT } from "@velocity/axios";
import { Repositories } from "../../types/chat";

export class ChatServices {
    public static async chat(prompt: string, repositoriesId?: string | null) {
        console.log(prompt, repositoriesId)
        if (prompt.trim() == "") return null;
        try {
            if (!repositoriesId || typeof repositoriesId === 'undefined') {
                // -- New chat flow
                const response = await postApi<ApiResponse<{ repositorie: Repositories, jobId: string }>>({
                    url: VELOCITY_CHAT,
                    values: { prompt }
                }) as ApiResponse<{ repositorie: Repositories, jobId: string }>;

                if (response.success && response.data) {
                    return response.data;
                }
            } else {
                // -- Existing chat flow
                const response = await postApi<ApiResponse<{ jobId: string }>>({
                    url: `${VELOCITY_CHAT}/${repositoriesId}`,
                    values: { prompt }
                }) as ApiResponse<{ repositorie: Repositories, jobId: string }>;

                if (response.success && response.data) {
                    return response.data;
                }
            }
        } catch (error) {
            throw error;
        }
    }
}