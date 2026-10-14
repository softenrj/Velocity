// Copyright (c) 2026 Raj
// See LICENSE for details.

export { deleteApi, getApi, patchApi, postApi } from "./src/common";
export type { ApiResponse } from "./src/common";

// auth
export const LOGIN: string = "/user/auth/login"
export const REGISTER: string = "/user/auth/register"
export const REFRESH: string = "/user/auth/refresh"
export const USER: string = "/user/auth/me"

// chat
export const VELOCITY_CHAT: string = "/chatv1/chat"
export const VELOCITY_REPOSITORIES: string = "/chatv1/repositories"
export const VELOCITY_CHAT_WITH_ID: string = "/chatv1/repositories"
export const VELOCITY_CHAT_STREAM_VALIDATE: string = "/chatv1/chat/stream/validate"
export const VELOCITY_CHAT_STREAM: string = "/chatv1/chat/stream"